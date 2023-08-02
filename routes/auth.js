const authRouter = require('express').Router();

const {  createUser,  login } = require('../controllers/users');
const { loginValidator, createUserValidator } = require('../middlewares/Validate');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', loginValidator, login);

module.exports = authRouter;
