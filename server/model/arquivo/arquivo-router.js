const controller = require('./arquivo-controller');
const Router = require('express').Router;
const router = new Router();  

router.route('/:id')
    .get((...args) => controller.findById(...args));

module.exports = router;