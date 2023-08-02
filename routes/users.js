const userRouter = require('express').Router();

const { getUsers, updateProfile } = require('../controllers/users');

const {  updateProfileValidator } = require('../middlewares/Validate');

userRouter.get('/users/me',  getUsers);
userRouter.patch('/users/me', updateProfileValidator, updateProfile);

module.exports = userRouter;
