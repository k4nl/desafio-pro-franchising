const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const ingredientRoutes = require('./src/routes/ingredientRoutes');
const productRoutes = require('./src/routes/productRoutes');
const salesRoutes = require('./src/routes/salesRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// para acessar a imagem
app.use('/images', express.static(path.join(__dirname, '/src/uploads')));

app.use('/ingredient', ingredientRoutes);
app.use('/product', productRoutes);
app.use('/sale', salesRoutes);
app.use('/', userRoutes);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Online na porta ${PORT}!`));