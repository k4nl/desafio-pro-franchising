const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const userControllers = require('./src/routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/', userControllers);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Online na porta ${PORT}!`));