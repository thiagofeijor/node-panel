const Model = require('../../lib/facade');
const publicacaoSchema = require('./publicacao-schema');
const usuarioSchema = require('../usuario/usuario-schema');
const arquivoModel = require('../arquivo/arquivo-model');
const fieldsVisibles = '_iduser titulo categoria texto lat lng comentarios';

class publicacaoModel extends Model {
    
  listarpublicacaos(query) {

    return publicacaoSchema
          .aggregate([
            { $match:
              query },
            { $sort: 
              {cadastro: -1}
            },
            { $lookup: {
                from: "usuarios", // collection name in db
                localField: "_iduser",
                foreignField: "_id",
                as: "usuario"
              }
            },
            {$lookup:
              {
                from: "usuarios",
                localField: "comentarios._iduser",
                foreignField: "_id",
                as: "comentariosObjects"
              }
            },
            { "$project": {
              "titulo": 1,
              "texto": 1,
              "_iduser": 1,
              "categoria": 1,
              "status": 1,
              "lng": 1,
              "lat": 1,
              "nome": { "$arrayElemAt": [ "$usuario.nome", 0 ] },
              "foto": { "$arrayElemAt": [ "$usuario.foto", 0 ] },
              "usuario.nome": { "$arrayElemAt": [ "$usuario.nome", 0 ] },
              "usuario._id": { "$arrayElemAt": [ "$usuario._id", 0 ] },
              "usuario._iduser": { "$arrayElemAt": [ "$usuario._id", 0 ] },
              "usuario.nome": { "$arrayElemAt": [ "$usuario.nome", 0 ] },
              "usuario.foto": { "$arrayElemAt": [ "$usuario.foto", 0 ] },
              "comentariosObjects.nome": { "$arrayElemAt": [ "$comentariosObjects.nome", 0 ] },
              "comentariosObjects._id": { "$arrayElemAt": [ "$comentariosObjects._id", 0 ] },
              "comentariosObjects.nome": { "$arrayElemAt": [ "$comentariosObjects.nome", 0 ] },
              "comentariosObjects.foto": { "$arrayElemAt": [ "$comentariosObjects.foto", 0 ] },
              "comentarios": {
                  "$filter": {
                      "input": "$comentarios",
                      "as": "comentarios",
                      "cond": { "$eq": [ "$$comentarios.status", "ativo" ] }
                  }
                }
            }}
          ]);
  }

  findById(query) {
    return publicacaoSchema
            .findById(query)
            .populate('publicacao')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return publicacaoSchema
            .findOne(query)
            .populate('publicacao')
            .select(fieldsVisibles)
            .exec();
  }
           
  criarpublicacaos(publicacao, callback, callbackErro) {
    const schema = new publicacaoSchema(publicacao);

    schema.save(publicacao, function (err, publicacaoRetorno) {
      if (publicacaoRetorno) {
        callback(publicacaoRetorno);
      }else{
        callbackErro(err);
      }
    })
    .catch(err => {
      callbackErro(err);
    })
  }
}

module.exports = new publicacaoModel(publicacaoSchema);