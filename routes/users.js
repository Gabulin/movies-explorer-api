const userRouter = require('express').Router();

const { getUsers, updateProfile } = require('../controllers/Users');

const {  updateProfileValidator } = require('../middlewares/Validate');

userRouter.get('/users/me',  getUsers);
userRouter.patch('/users/me', updateProfileValidator, updateProfile);

module.exports = userRouter;
