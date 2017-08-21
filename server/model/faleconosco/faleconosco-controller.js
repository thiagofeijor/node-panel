var mongoose = require('mongoose');
const Controller = require('../../lib/controller');
const faleconoscoModel = require('./faleconosco-model');
const config = require('../../../config')

class faleconoscoController extends Controller {

    listar(req, res, next) {
        var _success = function(){
            faleconoscoModel.listarfaleconoscos({"status":"ativo"})
                .then(faleconoscosEncontrados => res.status(200).json(faleconoscosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }
        
    criar(req, res, next){
        var log = req.body;
        faleconoscoModel.criarfaleconoscos(log,
            function(novofaleconosco){
                return res.status(201).json(novofaleconosco);
            },
            function(erro){
                return res.status(400).json({"msg":"Erro ao criar"});
            });
    }

    autenticar(req, callback, callbackErro) {
        var authorization = req.headers['authorization'];
        if (authorization == config.token_web) {
            callback();
        } else {
            callbackErro();
        }
    }
}

module.exports = new faleconoscoController(faleconoscoModel);