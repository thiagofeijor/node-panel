const controller = require('./chat-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/:id1')
    .get((...args) => controller.listarUser(...args));

router.route('/:id1/:id2')
    .get((...args) => controller.listar(...args))
    .post((...args) => controller.criar(...args));
    
router.route('/last/:id1/:id2')
    .post((...args) => controller.listarLast(...args));
    
router.route('/del/:id1/:id2')
    .get((...args) => controller.detela(...args));

module.exports = router;