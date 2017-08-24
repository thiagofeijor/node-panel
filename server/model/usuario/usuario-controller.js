var mongoose = require('mongoose');
const Controller = require('../../lib/controller');
const usuarioModel = require('./usuario-model');
const config = require('../../../config');
const emailService = require('../../services/retorno_service');
const arquivoModel = require('../arquivo/arquivo-model');

class UsuarioController extends Controller {

    listar(req, res, next) {
        
        var _success = function(){
            usuarioModel.listarUsuarios({"status":"ativo"})
                .then(usuariosEncontrados => res.status(200).json(usuariosEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);

    }

    listarProximo(req, res, next) {

        function distLatLong(lat1,lon1,lat2,lon2) {
            var Lati = Math.PI/180*(lat2-lat1);  //Graus  - > Radianos
            var Long = Math.PI/180*(lon2-lon1); 
            var a = Math.sin(Lati/2) * Math.sin(Lati/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                    Math.sin(Long/2) * Math.sin(Long/2); 
            return 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
        }
        function deg2rad (angle) {
            return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
        }

        var _success = function(){
            var usuarioAlterar = req.params.id;

            usuarioModel.findByOne({_id: usuarioAlterar})
                .then(doc => {
                    if (!doc) {
                        return res.status(404).json({"msg":"Seu usuário está inválido"});
                    }
                    usuarioModel.listarUsuarios({"status":"ativo"})
                        .then(usuariosEncontrados => {
                            var user = [];
                            var Lati,Long,a,lat1,lon1,lat2,lon2,distancia;
                            lat1 = doc.lat;
                            lon1 = doc.lng;

                            for(var i = 0; i < usuariosEncontrados.length; i++){

                                lat2 = usuariosEncontrados[i].lat;
                                lon2 = usuariosEncontrados[i].lng;
                                Lati = Math.PI/180*(lat2-lat1);  //Graus  - > Radianos
                                Long = Math.PI/180*(lon2-lon1); 
                                a = Math.sin(Lati/2) * Math.sin(Lati/2) +
                                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                                        Math.sin(Long/2) * Math.sin(Long/2); 
                                distancia = 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
                                
                                if(distancia){
                                    user.push({nome: usuariosEncontrados[i].nome, foto: usuariosEncontrados[i].foto,
                                            distancia: distancia, _id: usuariosEncontrados[i]._id
                                            });
                                }

                                if(i >= usuariosEncontrados.length-1){
                                    user.sort(function(a, b){
                                        if(a.distancia < b.distancia) return -1;
                                        if(a.distancia > b.distancia) return 1;
                                        return 0;
                                    });
                                    res.status(200).json(user);
                                }
                            }

                        })
                        .catch(err => next(err));
                })
                .catch(err => {
                    console.log("no catch do model");
                    next(err)
                })
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);

    }
    
    deleta(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;

            usuarioModel.update({_id: usuarioAlterar}, {$set: {status: 'excluido'}})
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
        
    criar(req, res, next){
        var log = req.body;
        usuarioModel.criarUsuarios(log,
            function(novoUsuario){
                return res.status(201).json(novoUsuario);
            },
            function(erro){
                return res.status(400).json({"msg":"Erro ao criar"});
            });
    }

    sendForgot(req, res, next){
        var _callbackSucesso = function () {
            var log = req.body;
            
            usuarioModel.findByOne({'email': log.email})
                    .then(doc => {
                        if (!doc) {
                            return res.status(404).json({"msg":"Nenhum usuário localizado"});
                        }
                        var senha = Math.random().toString(36).substring(0, 7);

                        usuarioModel.update({_id: doc._id}, {$set: {senha: senha}})
                            .then(usuarioAtualizado => {
                                if (usuarioAtualizado.ok == '1') {
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

    applogin(req, res, next) {
        var _callbackSucesso = function () {
            var log = req.body;
            log.status = 'ativo';

            usuarioModel.findByOne(log)
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

    atualizar_foto(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;
            var usuarioPush = req.body;

            arquivoModel.criararquivo(usuarioPush, 'foto', function(usuarioRetorno){
                usuarioModel.update({_id: usuarioAlterar}, {$set: usuarioRetorno})
                    .then(usuarioAtualizado => {
                        if (usuarioAtualizado.ok == '1') {
                            usuarioModel.findByOne({_id: usuarioAlterar})
                                .then(doc => {
                                    if (!doc) {
                                        return res.status(404).json({"msg":"Nenhum usuário localizado"});
                                    }
                                    res.status(200).json(doc);
                                })
                                .catch(err => {
                                    console.log("no catch do model");
                                    next(err)
                                })
                        } else {
                            return res.status(400).json({"msg":"Erro ao atualizar"});
                        }
                    })
                    .catch(error => {
                        return res.status(400).json({"msg":"Erro ao atualizar"});
                    });
            }, function(){
                return res.status(400).json({"msg":"Erro ao atualizar"});
            })
        };

        var _callbackErro = function () {
            return res.status(401).end();
        };

        this.autenticar(req, _atualizaUsuario, _callbackErro);
    }

    geolocation(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;
            var usuarioPush = {'lat': req.body.lat,'lng': req.body.lng};

            usuarioModel.update({_id: usuarioAlterar}, {$set: usuarioPush})
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

            usuarioModel.findByOne({_id: usuarioAlterar, senha: usuarioPush.antiga})
                .then(doc => {
                    if (!doc) {
                        return res.status(404).json({"msg":"Senha incorreta"});
                    }
                    usuarioModel.update({_id: usuarioAlterar}, {$set: {senha: usuarioPush.senha}})
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

    atualizar(req, res){ 
        
        var _atualizaUsuario = function () {
            var usuarioAlterar = req.params.id;
            var usuarioPush = req.body;

            usuarioModel.update({_id: usuarioAlterar}, {$set: usuarioPush})
                .then(usuarioAtualizado => {
                    if (usuarioAtualizado.ok == '1') {
                        usuarioModel.findByOne({_id: usuarioAlterar})
                                .then(doc => {
                                    if (!doc) {
                                        return res.status(404).json({"msg":"Nenhum usuário localizado"});
                                    }
                                    res.status(200).json(doc);
                                })
                                .catch(err => {
                                    console.log("no catch do model");
                                    next(err)
                                })
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

    autenticar(req, callback, callbackErro) {
        var authorization = req.headers['authorization'];
        if (authorization == config.token_web) {
            callback();
        } else {
            callbackErro();
        }
    }
}

module.exports = new UsuarioController(usuarioModel);