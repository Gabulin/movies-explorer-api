const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
// config
const cookieParser = require('cookie-parser');
const { MONGODB_URI, PORT, origin } = require('./utils/Config');
const { limit } = require('./utils/RateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/Errors');

const app = express();

app.use(express.static('public'));
app.use(cors({ origin }));
app.use(express.json());
app.use(requestLogger);
app.use(limit);
app.use(helmet());
app.use(cookieParser());
app.use(require('./routes'));

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

async function main() {
  // console.debug({ MONGODB_URI });
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => console.info(`Server listen: ${PORT}`));
}

main();
