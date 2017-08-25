var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Controller = require('../../lib/controller');
const chatModel = require('./chat-model');
const usuarioModel = require('../usuario/usuario-model');
const config = require('../../../config')

class chatController extends Controller {

    listar(req, res, next) {
        var _success = function(){
            var id1 = req.params.id1;
            var id2 = req.params.id2;
            chatModel.listarchats({
                                    $and:[
                                        {$or:[{"_id1":ObjectId(id1)},{"_id2":ObjectId(id1)}]},
                                        {$or:[{"_id1":ObjectId(id2)},{"_id2":ObjectId(id2)}]},
                                        {"_exclusao": {$nin: [id1]}},
                                        {"status":"ativo"}
                                    ]
                                })
                .then(chatsEncontrados => res.status(200).json(chatsEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }

    listarLast(req, res, next) {
        var _success = function(){
            var id1 = req.params.id1;
            var id2 = req.params.id2;
            chatModel.listarchats({$and:[
                                        {$or:[{"_id1":ObjectId(id1)},{"_id2":ObjectId(id1)}]},
                                        {$or:[{"_id1":ObjectId(id2)},{"_id2":ObjectId(id2)}]},
                                        {"cadastro": { $gt: new Date(req.body.cadastro) }},
                                        {"_exclusao": {$nin: [id1]}},
                                        {"status":"ativo"}
                                    ]
                                })
                .then(chatsEncontrados => res.status(200).json(chatsEncontrados))
                .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }

    detela(req, res, next) {
        var _success = function(){
            var id1 = req.params.id1;
            var id2 = req.params.id2;
            chatModel.listarchats({$and:[
                                        {$or:[{"_id1":ObjectId(id1)},{"_id2":ObjectId(id1)}]},
                                        {$or:[{"_id1":ObjectId(id2)},{"_id2":ObjectId(id2)}]},
                                        {"_exclusao": {$nin: [id1]}},
                                        {"status":"ativo"}
                                    ]})
                    .then(chatsEncontrados => {
                        for(var i = 0; i < chatsEncontrados.length; i++){
                            chatModel.update({_id: chatsEncontrados[i]._id}, {$push: {"_exclusao": id1}})
                                .then(chatsEncontrados => console.log('foi'))
                                .catch(err => next(err));
                        }

                        res.status(200).json(chatsEncontrados)
                    })
                    .catch(err => next(err));
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }

    listarUser(req, res, next) {
        var _success = function(){
            function deg2rad (angle) {
                return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
            }

            var id1 = req.params.id1;
            chatModel.listarchat({$and:[
                                        {$or:[{"_id1":ObjectId(id1)},{"_id2":ObjectId(id1)}]},
                                        {"_exclusao": {$nin: [id1]}},
                                        {"status":"ativo"}
                                    ]
                                })
                .then(chatsEncontrados => {
                    usuarioModel.findOne({'status':'ativo','_id':ObjectId(id1)})
                    .then(usuariosEncontrados => {
                        if (chatsEncontrados.length < 1) {
                            return res.status(404).json({'message':'Nenhuma conversa'});
                        }

                        var usuarios = [],
                            chats = [],
                            user1 = chatsEncontrados[0]._id.usuario1,
                            user2 = chatsEncontrados[0]._id.usuario2,
                            lat1 = usuariosEncontrados.lat,
                            lon1 = usuariosEncontrados.lng,
                            lat2, lon2, Lati, Long, a, distancia;

                        for(var i = 0; i < user1.length; i++){
                            usuarios.push(user1[i]);
                        }
                        for(var i = 0; i < user2.length; i++){
                            usuarios.push(user2[i]);
                        }

                        usuarios = Array.from(new Set(usuarios.map(e => JSON.stringify(e)))).map(e => JSON.parse(e));

                        for(var i = 0; i < usuarios.length; i++){
                            
                            lat2 = usuarios[i].lat;
                            lon2 = usuarios[i].lng;
                            Lati = Math.PI/180*(lat2-lat1); 
                            Long = Math.PI/180*(lon2-lon1); 
                            a = Math.sin(Lati/2) * Math.sin(Lati/2) +
                                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                                    Math.sin(Long/2) * Math.sin(Long/2); 
                            distancia = 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
                            
                            if(distancia){
                                if(usuarios[i]._id != usuariosEncontrados._id){
                                    chats.push({"_id": usuarios[i]._id, "nome": usuarios[i].nome,
                                                "foto": usuarios[i].foto, "distancia": distancia});
                                }
                            }

                            if(i >= usuarios.length-1){
                                chats.sort(function(a, b){
                                    if(a.distancia < b.distancia) return -1;
                                    if(a.distancia > b.distancia) return 1;
                                    return 0;
                                });
                                res.status(200).json(chats);
                            }
                        }
                    })
                    .catch(err => next(err));
                })
                .catch(err => next(err));
            
        }

        var _error = function(){
            res.status(401).end();
        }

        this.autenticar(req, _success, _error);
    }
        
    criar(req, res, next){
        var log = req.body;
        log._id1 = req.params.id1;
        log._id2 = req.params.id2;
        
        chatModel.criarchats(log,
            function(novochat){
                return res.status(201).json(novochat);
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

module.exports = new chatController(chatModel);