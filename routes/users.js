const router = require('express').Router();
const { getUser, updateProfile } = require('../controllers/Users');
const { updateProfileValidator } = require('../middlewares/Validate');

router.get('/me', getUser);
router.patch('/me', updateProfileValidator, updateProfile);

module.exports = router;
