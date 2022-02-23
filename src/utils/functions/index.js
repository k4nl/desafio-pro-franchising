const CustomError = require('../../middlewares/CustomError');
const { ObjectId } = require('mongodb');
const e = require('../dictionary/errorObjects');
const s = require('../dictionary/status');

const verifyJoiError = (error) => {
  const msg = error && error.details[0].message;
  if (error) {
    throw new CustomError({ status: s.invalidRequest, message: msg });
  }
}

const verifyIfUserEmailExists = (email) => {
  if (email) {
    throw new CustomError(e.emailAlreadyExist);
  };
};

const verifyUser = (user) => {
  if (!user) {
    throw new CustomError(e.userNotFound)
  }
}

const verifyPassword = ({ user }, password) => {
  if (user.password !== password) {
    throw new CustomError(e.incorrectPassword)
  }
}


const verifyIngredientName = (ingredient) => {
  if (ingredient) {
    throw new CustomError(e.invalidIngredientName)
  }
}

const verifyUnitOfMeasurement = (unit) => {
  const available = ['kg', 'g', 'u', 'l', 'ml'];
  if (!available.includes(unit)) {
    throw new CustomError(e.unitOfMeasurementNotAvailable)
  }
}

const dataFormat = (data) => {
  let newObject = {};
  for (let [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      newObject[key] = value.toLowerCase();
    } else {
      newObject[key] = value;
    }
  }

  newObject.stockPrice = Math.round((newObject.quantity * newObject.unitPrice), -2);

  return newObject;
}

const verifyIfIngredientIdExist = (ingredient) => {
  if (!ingredient) {
    throw new CustomError(e.ingredientNotFound);
  }
};

const verifyUserAdmin = (user) => {
  if (user.role !== 'admin') {
    throw new CustomError(e.unauthorized);
  }
}

const verifyIfAllIngredientsExists = (allIngredients, ingredientsData) => {
  const verified = ingredientsData.map(({ ingredientId }) => !!allIngredients.find(({ _id}) => ingredientId === _id ));
  if (verified.includes('false')) {
    throw new CustomError(e.ingredientNotFound);
  }
};

const multiplyQuantityByNeeded = (ingredients, quantitySold) => {
  return ingredients.map((ingredient) => {
    const quantity = ingredient.quantity * quantitySold;
    return {
      ...ingredient,
      quantity,
    }
  });
}

const sumSameIngredientsQuantity = (acc, curr, index) => {
  index = acc.findIndex((item) => item.ingredientId === curr.ingredientId);
  if (index < 0) {
    acc.push(curr);
  } else {
    acc[index].quantity += curr.quantity;
  }
  return acc;
}

const setNewQuantity = (allProducts, sale) => {
  let ingredientsQuantity = [];
  sale.forEach(({ productId }, i) => {
    const productFound = allProducts.find((product) => {
      const id = JSON.stringify(product._id).replaceAll('"', '');
      return id === productId;
    });
    if (!productFound) {
      throw new CustomError(e.productNotFound);
    };
    const newQ = multiplyQuantityByNeeded(productFound.product.productIngredients, sale[i].quantity);
    ingredientsQuantity = [...ingredientsQuantity, ...newQ]
  })
  return ingredientsQuantity.reduce(sumSameIngredientsQuantity, []);
}

const verifyIfProductExists = (product) => {
  if (!product) {
    throw new CustomError(e.productNotFound);
  }
};

const setSameUnitOfMensurement = (stock, req) => {
  if (stock.unitOfMeasurement === 'kg' || stock.unitOfMeasurement === 'l') {
    if (req.unitOfMeasurement === 'g' ||  req.unitOfMeasurement === 'ml') {
      return req.quantity / 1000;
    }
  }
  return req.quantity;
};

const verifyQuantity = ({ name, quantity }, q2) => {
  if (quantity < q2) {
    throw new CustomError({
      status: s.invalidRequest,
      message: `The ingredient ${name} is not enough`,
    });
  }
}

const verifyIngredientStock = (allIngredients, ingredientNeeded) => {
  return ingredientNeeded.map(({ ingredientId, quantity, unitOfMeasurement }) => {
    const ingredientFound = allIngredients.find((ingredient) => {
      const id = JSON.stringify(ingredient._id).replaceAll('"', '')
      return id === ingredientId;
    });

    verifyIfIngredientIdExist(ingredientFound);
     
    const sameUnit = setSameUnitOfMensurement(ingredientFound.ingredient, { unitOfMeasurement, quantity });
    verifyQuantity(ingredientFound.ingredient, sameUnit);
    const reducedStockPrice = Math.round(sameUnit * ingredientFound.ingredient.unitPrice)
    return {
      _id:  JSON.stringify(ingredientFound._id).replaceAll('"', ''),
      name: ingredientFound.ingredient.name,
      stockPrice: reducedStockPrice,
      quantity: sameUnit,
    };
  })
}


module.exports = {
  verifyIfUserEmailExists,
  verifyJoiError,
  verifyUser,
  verifyPassword,
  verifyIngredientName,
  dataFormat,
  verifyIfIngredientIdExist,
  verifyUserAdmin,
  verifyIfAllIngredientsExists,
  verifyIfProductExists,
  setNewQuantity,
  verifyIngredientStock,
  verifyUnitOfMeasurement,
}