const { Router } = require("express");
const router = Router();
const controllers = require("../controllers");
const middleware = require('../middlewares')

router.post("/sign-up", controllers.userController.register);

router.post("/sign-in", controllers.userController.login);

router.get('/all',middleware.users.isValid ,controllers.userController.all)

module.exports = router;
