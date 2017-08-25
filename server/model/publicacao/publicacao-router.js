const controller = require('./publicacao-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));
    
router.route('/:id')
    .get((...args) => controller.listarcomuser(...args));
    
router.route('/:id/edita')
    .post((...args) => controller.edita(...args));

router.route('/:id/denuncia')
    .get((...args) => controller.denuncia(...args));

router.route('/:id/deleta')
    .get((...args) => controller.deleta(...args));

router.route('/:id/comentario')
    .post((...args) => controller.comenta(...args));

module.exports = router;