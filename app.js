require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { limit } = require('./utils/RateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/Errors');

const { CURRENT_MONGO_ADDRESS } = require('./utils/Config');

const { PORT = 3000 } = process.env;

/* const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env; */

const app = express();

const router = require('./routes/index');

app.use(express.json());
app.use(limit);
app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.use(cors({
  origin: [
    'https://gn.movies-explorer.api.nomoreparties.co',
    'http://localhost:3000',
  ],
}));

async function main() {
  await mongoose.connect(CURRENT_MONGO_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main();

// mongoose.connect(CURRENT_MONGO_ADDRESS);
// mongoose.connect('mongodb://127.0.0.1/test')
// mongoose.connect(MONGO);

app.listen(PORT, () => console.log(`Server listen: ${PORT}`)); // eslint-disable-line no-console
