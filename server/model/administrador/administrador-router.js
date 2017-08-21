const controller = require('./administrador-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));

router.route('/login')
    .post((...args) => controller.applogin(...args));

router.route('/forgot')
    .post((...args) => controller.sendForgot(...args));

module.exports = router;