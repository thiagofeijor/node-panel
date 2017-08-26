const controller = require('./notificacao-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));

router.route('/envia/:tipo')
    .post((...args) => controller.criarByOne(...args));

router.route('/:id')
    .get((...args) => controller.listarByOne(...args));

module.exports = router;