const Model = require('../../lib/facade');
const publicacaoSchema = require('./publicacao-schema');
const usuarioSchema = require('../usuario/usuario-schema');
const arquivoModel = require('../arquivo/arquivo-model');
const fieldsVisibles = '_iduser titulo categoria texto lat lng';

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
            { "$project": { 
                "_iduser": 1,
                "titulo": 1,
                "cadastro": 1,
                "texto": 1,
                "nome": { "$arrayElemAt": [ "$usuario.nome", 0 ] },
                "foto": { "$arrayElemAt": [ "$usuario.foto", 0 ] },
                "fotos": { "$arrayElemAt": [ "$usuario.fotos", 0 ] },
                "lat": { "$arrayElemAt": [ "$usuario.lat", 0 ] },
                "lng": { "$arrayElemAt": [ "$usuario.lng", 0 ] }
              }
            }
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