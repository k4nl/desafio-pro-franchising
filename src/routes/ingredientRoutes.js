const express = require('express');

const router = express.Router();

const ingredientControllers = require('../controllers/ingredientControllers');
const auth = require('../middlewares/auth');

router.post('/', auth.ingredientRouteVerify, ingredientControllers.createIngredient);

router.get('/:id', auth.ingredientRouteVerify, ingredientControllers.findIngredientById);

router.put('/:id', auth.ingredientRouteVerify, ingredientControllers.updateIngredient);

router.delete('/:id', auth.ingredientRouteVerify, ingredientControllers.deleteIngredient);

router.get('/', auth.ingredientRouteVerify, ingredientControllers.findAll);

module.exports = router;