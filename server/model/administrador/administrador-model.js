const Model = require('../../lib/facade');
const administradorSchema = require('./administrador-schema');
const arquivoModel = require('../arquivo/arquivo-model');
const fieldsVisibles = '_id email';

class administradorModel extends Model {
    
  listaradministradors(query) {
    return administradorSchema
            .find(query)
            .select(fieldsVisibles)
            .populate('administrador');
  }

  findById(query) {
    return administradorSchema
            .findById(query)
            .populate('administrador')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return administradorSchema
            .findOne(query)
            .populate('administrador')
            .select(fieldsVisibles)
            .exec();
  }
           
  criaradministradors(administrador, callback, callbackErro) {
    const schema = new administradorSchema(administrador);

    administradorSchema.findOne({"email":administrador.email})
      .populate('administrador')
      .exec()
      .then(doc => {
        if (!doc) {
          schema.save(administrador, function (err, administradorRetorno) {
            if (administradorRetorno) {
              administradorRetorno.save();
              callback(administradorRetorno);
            }else{
              callbackErro(err);
            }
          })
          .catch(err => {
            callbackErro(err);
          })
        } else {
          callbackErro();
        }
    });
  }
}

module.exports = new administradorModel(administradorSchema);