var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Controller = require('../../lib/controller');
const publicacaoModel = require('./publicacao-model');
const notificacaoModel = require('../notificacao/notificacao-model');
const config = require('../../../config')

class publicacaoController extends Controller {

    listar(req, res, next) {
        function deg2rad (angle) {
            return angle * 0.017453292519943295
        }

        var _success = function(){
            if(req.query.tipo == 'false'){
                publicacaoModel.listarpublicacaos({"status":"ativo"})
                    .then(publicacaosEncontrados => {
                        if(req.query.page)
                            publicacaosEncontrados = publicacaosEncontrados.splice((req.query.page == 0 ? 0 : req.query.page),
                                                                        (req.query.page+5));
                        res.status(200).json(publicacaosEncontrados)
                    })
                    .catch(err => next(err)); 
            }else{
                publicacaoModel.listarpublicacaos({"status":"ativo"})
                    .then(publicacaosEncontrados => {
                        var user = [];
                        var Lati,Long,a,lat1,lon1,lat2,lon2,distancia;
                        lat1 = req.query.lat;
                        lon1 = req.query.lng;

                        for(var i = 0; i < publicacaosEncontrados.length; i++){

                            lat2 = publicacaosEncontrados[i].lat;
                            lon2 = publicacaosEncontrados[i].lng;
                            Lati = Math.PI/180*(lat2-lat1);  //Graus  - > Radianos
                            Long = Math.PI/180*(lon2-lon1); 
                            a = Math.sin(Lati/2) * Math.sin(Lati/2) +
                                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                                    Math.sin(Long/2) * Math.sin(Long/2); 
                            distancia = 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
                            
                            if(distancia){
                                user.push({
                                    distancia: distancia, 
                                    _iduser: publicacaosEncontrados[i]._iduser,
                                    titulo: publicacaosEncontrados[i].titulo,
                                    categoria: publicacaosEncontrados[i].categoria,
                                    texto: publicacaosEncontrados[i].texto,
                                    comentarios: publicacaosEncontrados[i].comentarios,
                                    comentariosObjects: publicacaosEncontrados[i].comentariosObjects,
                                    usuario: publicacaosEncontrados[i].usuario,
                                    nome: publicacaosEncontrados[i].nome, 
                                    _id: publicacaosEncontrados[i]._id, 
                                    foto: publicacaosEncontrados[i].foto
                                });
                            }

                            if(i >= publicacaosEncontrados.length-1){
                                user.sort(function(a, b){
                                    if(a.distancia < b.distancia) return -1;
                                    if(a.distancia > b.distancia) return 1;
                                    return 0;
                                });

                                if(req.query.page)
                                    user = user.splice((req.query.page == 0 ? 0 : req.query.page),
                                                        (req.query.page+5));
                                res.status(200).json(user);
                            }
                        }

                    })
                    .catch(err => next(err)); 
            }
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

    edita(req, res, next){
        var publicacao = req.params.id;
        var log = req.body;

        var _success = function(){
            publicacaoModel.update({_id: publicacao}, {$set: log})
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
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }

    denuncia(req, res, next){
        var publicacao = req.params.id;

        var _success = function(){
            publicacaoModel.update({_id: publicacao}, {$set: {status: 'denunciado'}})
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
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);

    }

    deleta(req, res, next){
        var publicacao = req.params.id;

        var _success = function(){
            publicacaoModel.update({_id: publicacao}, {$set: {status: 'excluido'}})
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
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);

    }

    comenta(req, res, next){

        var _success = function(){
            var publicacao = req.params.id;
            var log = req.body;
            log.data = Date.now();
            log._iduser = ObjectId(log._iduser);
            log.status = 'ativo';

            if(req.params.iduser != log._iduser){
                notificacaoModel.criarnotificacaos({'tipo':'comentario','_iduser':req.params.iduser,'texto':log.nome},
                    function(novonotificacao){
                        console.log(novonotificacao)
                    },
                    function(erro){
                        console.log('Erro');
                    });
            }
            
            publicacaoModel.update({_id: publicacao}, {$push: {comentarios: log}})
                .then(usuarioAtualizado => {
                    if (usuarioAtualizado.ok == '1') {
                        return res.status(200).json({"msg":"Atualizado com sucesso."});
                    } else {
                        return res.status(400).json({"msg":"Erro ao atualizar"});
                    }
                })
                .catch(error => {
                    return res.status(400).json({"msg":"Erro ao tentar atualizar"});
                });
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