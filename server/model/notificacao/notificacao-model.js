const Model = require('../../lib/facade');
const notificacaoSchema = require('./notificacao-schema');
const fieldsVisibles = '_iduser extra tipo texto confirmado cadastro';

class notificacaoModel extends Model {
    
  listarnotificacaos(query) {
    return notificacaoSchema
        .aggregate([
            { $match:
              query },
            { $sort: 
              {cadastro: -1}
            }
          ]);
  }

  findById(query) {
    return notificacaoSchema
            .findById(query)
            .populate('notificacao')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return notificacaoSchema
            .findOne(query)
            .populate('notificacao')
            .select(fieldsVisibles)
            .exec();
  }
           
  criarnotificacaos(notificacao, callback, callbackErro) {
    const schema = new notificacaoSchema(notificacao);

    schema.save(notificacao, function (err, notificacaoRetorno) {
      if (notificacaoRetorno) {
        callback(notificacaoRetorno);
      }else{
        callbackErro(err);
      }
    })
    .catch(err => {
      callbackErro(err);
    })
  }
}

module.exports = new notificacaoModel(notificacaoSchema);