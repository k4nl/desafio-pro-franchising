const express = require('express');

const router = express.Router();

const ingredientControllers = require('../controllers/ingredientControllers');

router.post('/', ingredientControllers.createIngredient);

router.get('/:id', ingredientControllers.findIngredientById);

router.get('/', ingredientControllers.findAll);

router.put('/:id', ingredientControllers.updateIngredient);

router.delete('/:id', ingredientControllers.deleteIngredient);


module.exports = router;