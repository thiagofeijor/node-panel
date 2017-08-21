const express = require('express');
const router = express.Router();

const usuario  = require('../model/usuario/usuario-router');
const arquivo  = require('../model/arquivo/arquivo-router');
const publicacao  = require('../model/publicacao/publicacao-router');
const faleconosco  = require('../model/faleconosco/faleconosco-router');
const administrador  = require('../model/administrador/administrador-router');

router.use('/usuario', usuario);
router.use('/arquivo', arquivo);
router.use('/publicacao', publicacao);
router.use('/faleconosco', faleconosco);
router.use('/administrador', administrador);


module.exports = router;