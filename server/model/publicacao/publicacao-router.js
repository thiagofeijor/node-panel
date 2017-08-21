const controller = require('./publicacao-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));

router.route('/:id')
    .get((...args) => controller.listarcomuser(...args));

module.exports = router;