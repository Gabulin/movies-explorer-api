const router = require('express').Router();

const { createUser, login } = require('../controllers/Users');
const { loginValidator, createUserValidator } = require('../middlewares/Validate');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);

module.exports = router;
