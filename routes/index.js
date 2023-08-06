const router = require('express').Router();
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { logout } = require('../controllers/Users');

// Роуты не требующие авторизации
router.use(require('./auth'));

// Подключение auth middleware
router.use(auth);

// Подключение маршрутов
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

// Роут для выхода из системы
router.post('/signout', logout);

// Обработка несуществующих маршрутов
router.use('*', (_, res, next) => next(new NotFoundError()));

module.exports = router;
