var mongoose = require('mongoose');
const Controller = require('../../lib/controller');
const administradorModel = require('./administrador-model');
const config = require('../../../config');
const emailService = require('../../services/retorno_service');
const arquivoModel = require('../arquivo/arquivo-model');

class administradorController extends Controller {

    listar(req, res, next) {
        
        var _success = function(){
            administradorModel.listaradministradors({"status":"ativo","tipo":"adm"})
                .then(administradorsEncontrados => res.status(200).json(administradorsEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);

    }
        
    criar(req, res, next){
        var log = req.body;
        administradorModel.criaradministradors(log,
            function(novoadministrador){
                return res.status(201).json(novoadministrador);
            },
            function(erro){
                return res.status(400).json({"msg":"Erro ao criar"});
            });
    }

    sendForgot(req, res, next){
        var _callbackSucesso = function () {
            var log = req.body;
            
            administradorModel.findByOne({'email': log.email})
                    .then(doc => {
                        if (!doc) {
                            return res.status(404).json({"msg":"Nenhum usuário localizado"});
                        }
                        var senha = Math.random().toString(36).substring(0, 7);

                        administradorModel.update({_id: doc._id}, {$set: {senha: senha}})
                            .then(administradorAtualizado => {
                                if (administradorAtualizado.ok == '1') {
                                    emailService({
                                        to: req.body.email, 
                                        subject: "Recuperação de senha", 
                                        text: "Olá, geramos uma nova senha para você por enquanto. Senha nova senha é: "+senha, 
                                        html: "Olá, geramos uma nova senha para você por enquanto. Senha nova senha é: "+senha
                                    });
                                    
                                    return res.status(200).json({"msg":"Enviado."});
                                } else {
                                    return res.status(400).json({"msg":"Erro ao logar"});
                                }
                            })
                            .catch(error => {
                                return res.status(400).json({"msg":"Erro ao logar"});
                            });
                    })
                    .catch(err => {
                        console.log("no catch do model");
                        next(err)
                    })

            
        };

        var _callbackErro = function () {
            console.log('no callback erro');
            return res.status(401).end();
        };

        this.autenticar(req, _callbackSucesso, _callbackErro);

    }
    
    deleta(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;

            administradorModel.update({_id: usuarioAlterar}, {$set: {status: 'excluido'}})
                .then(usuarioAtualizado => {
                    if (usuarioAtualizado.ok == '1') {
                        return res.status(200).json({"msg":"Atualizado com sucesso."});
                    } else {
                        return res.status(400).json({"msg":"Erro ao atualizar"});
                    }
                })
                .catch(error => {
                    return res.status(400).json({"msg":"Erro ao atualizar"});
                });

        };

        var _callbackErro = function () {
            return res.status(401).end();
        };

        this.autenticar(req, _atualizaUsuario, _callbackErro);
    }

    pass(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;
            var usuarioPush = req.body;

            administradorModel.findByOne({_id: usuarioAlterar})
                .then(doc => {
                    if (!doc) {
                        return res.status(404).json({"msg":"Usuário não localizado"});
                    }
                    administradorModel.update({_id: usuarioAlterar}, {$set: {senha: usuarioPush.senha}})
                        .then(usuarioAtualizado => {
                            if (usuarioAtualizado.ok == '1') {
                                return res.status(200).json({"msg":"Atualizado com sucesso."});
                            } else {
                                return res.status(400).json({"msg":"Erro ao atualizar"});
                            }
                        })
                        .catch(error => {
                            return res.status(400).json({"msg":"Erro ao atualizar"});
                        });
                })
                .catch(err => {
                    console.log("no catch do model");
                    next(err)
                })
        };

        var _callbackErro = function () {
            return res.status(401).end();
        };

        this.autenticar(req, _atualizaUsuario, _callbackErro);
    }

    applogin(req, res, next) {
        var _callbackSucesso = function () {
            var log = req.body;
            log.status = 'ativo';
            log.tipo = 'adm';
            
            administradorModel.findByOne(log)
                    .then(doc => {
                        if (!doc) {
                            return res.status(404).json({"msg":"Nenhum usuário localizado"});
                        }
                        return res.status(200).json(doc);
                    })
                    .catch(err => {
                        console.log("no catch do model");
                        next(err)
                    })
        };

        var _callbackErro = function () {
            console.log('no callback erro');
            return res.status(401).end();
        };

        this.autenticar(req, _callbackSucesso, _callbackErro);
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

module.exports = new administradorController(administradorModel);