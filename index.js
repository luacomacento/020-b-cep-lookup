require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cepRoute = require('./routes/cep.route');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong!' }));
app.use('/cep', cepRoute);

app.use(errorMiddleware);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));