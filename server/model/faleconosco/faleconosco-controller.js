var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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

    listarUser(req, res, next) {
        var _success = function(){
            var publicacao = req.params.id;
            faleconoscoModel.listarfaleconoscos({"status":"ativo","_iduser":ObjectId(publicacao)})
                .then(faleconoscosEncontrados => res.status(200).json(faleconoscosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }
        
    respondidoUser(req, res, next) {
        var _success = function(){
            var publicacao = req.params.id;
            faleconoscoModel.update({_id: publicacao}, {$set: {respondido: 'sim'}})
            .then(usuarioAtualizado => {
                if (usuarioAtualizado.ok == '1') {
                    return res.status(200).json({"msg":"Atualizado."});
                } else {
                    return res.status(400).json({"msg":"Erro ao atualizar"});
                }
            })
            .catch(error => {
                return res.status(400).json({"msg":"Erro tentar atualizar"});
            });
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