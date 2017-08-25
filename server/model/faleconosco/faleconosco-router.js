const controller = require('./faleconosco-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));

router.route('/:id')
    .get((...args) => controller.listarUser(...args));
    
router.route('/respondido/:id')
    .get((...args) => controller.respondidoUser(...args));

module.exports = router;