var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Controller = require('../../lib/controller');
const publicacaoModel = require('./publicacao-model');
const config = require('../../../config')

class publicacaoController extends Controller {

    listar(req, res, next) {
        var _success = function(){
            publicacaoModel.listarpublicacaos({"status":"ativo"})
                .then(publicacaosEncontrados => res.status(200).json(publicacaosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }

    listarcomuser(req, res, next) {
        var usuario = req.params.id;

        var _success = function(){
            publicacaoModel.listarpublicacaos({"status":"ativo","_iduser":ObjectId(usuario)})
                .then(publicacaosEncontrados => res.status(200).json(publicacaosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }
        
    criar(req, res, next){
        var log = req.body;
        publicacaoModel.criarpublicacaos(log,
            function(novopublicacao){
                return res.status(201).json(novopublicacao);
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

module.exports = new publicacaoController(publicacaoModel);