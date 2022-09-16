require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { errors } = require('celebrate');

const { ERR_DEFAULT } = require('./const/errors');
const NotFound = require('./errors/not-found');

const { login, createUser } = require('./controllers/users');

const { loginValidationSchema, createUserValidationSchema } = require('./middlewares/validators');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://liza.nomoredomains.sbs',
  'http://localhost:3001',
  'http://51.250.96.186',
];

const app = express();

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).send();
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(requestLogger);

app.use(morgan('tiny'));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidationSchema, login);
app.post('/signup', createUserValidationSchema, createUser);

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(auth);

app.use('/', userRouter);
app.use('/', cardsRouter);

app.use('*', () => {
  throw new NotFound('Запрашиваемый URL не существует');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERR_DEFAULT, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERR_DEFAULT
        ? 'Ошибка сервера. Попробуйте позже'
        : message,
    });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));
