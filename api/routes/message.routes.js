const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares');
const controllers = require('../controllers')

router.post('/create',middleware.users.isValid, controllers.messageController.create)

router.post('/chat',middleware.users.isValid, controllers.messageController.chat)

module.exports = router;