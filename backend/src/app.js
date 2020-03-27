const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json()); //necessario para que a aplicacao possa receber corretamente os dados de uma req post
app.use(routes);
app.use(errors());

module.exports = app;