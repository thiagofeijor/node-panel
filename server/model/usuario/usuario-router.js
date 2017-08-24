const controller = require('./usuario-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));
    
router.route('/:id/delete')
    .get((...args) => controller.deleta(...args));

router.route('/:id/proximo')
    .get((...args) => controller.listarProximo(...args));

router.route('/forgot')
    .post((...args) => controller.sendForgot(...args));

router.route('/applogin')
    .post((...args) => controller.applogin(...args));

router.route('/:id/upfoto')
    .post((...args) => controller.atualizar_foto(...args));

router.route('/:id/atualizar')
    .post((...args) => controller.atualizar(...args));

router.route('/:id/pass')
    .post((...args) => controller.pass(...args));

router.route('/:id/geolocation')
    .post((...args) => controller.geolocation(...args));

module.exports = router;