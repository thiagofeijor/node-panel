var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Controller = require('../../lib/controller');
const notificacaoModel = require('./notificacao-model');
const config = require('../../../config')

class notificacaoController extends Controller {

    listar(req, res, next) {
        var _success = function(){
            notificacaoModel.listarnotificacaos({"status":"ativo"})
                .then(notificacaosEncontrados => res.status(200).json(notificacaosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }
    
    criar(req, res, next){
        var log = req.body;
        notificacaoModel.criarnotificacaos(log,
            function(novonotificacao){
                return res.status(201).json(novonotificacao);
            },
            function(erro){
                return res.status(400).json({"msg":"Erro ao criar"});
            });
    }

    criarByOne(req, res, next) {
        var log = req.body;
        log.tipo = req.params.tipo;

        notificacaoModel.criarnotificacaos(log,
            function(novonotificacao){
                return res.status(201).json(novonotificacao);
            },
            function(erro){
                return res.status(400).json({"msg":"Erro ao criar"});
            });
    }

    listarByOne(req, res, next) {
        var _success = function(){
            var usuario = req.params.id;

            notificacaoModel.listarnotificacaos({"status":"ativo","_iduser":ObjectId(usuario)})
                .then(notificacaosEncontrados => res.status(200).json(notificacaosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
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

module.exports = new notificacaoController(notificacaoModel);