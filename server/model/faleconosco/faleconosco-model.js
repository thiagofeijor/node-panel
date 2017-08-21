const Model = require('../../lib/facade');
const faleconoscoSchema = require('./faleconosco-schema');
const fieldsVisibles = 'assunto descricao';

class faleconoscoModel extends Model {
    
  listarfaleconoscos(query) {
    return faleconoscoSchema
            .find(query)
            .select(fieldsVisibles)
            .populate('faleconosco');
  }

  findById(query) {
    return faleconoscoSchema
            .findById(query)
            .populate('faleconosco')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return faleconoscoSchema
            .findOne(query)
            .populate('faleconosco')
            .select(fieldsVisibles)
            .exec();
  }
           
  criarfaleconoscos(faleconosco, callback, callbackErro) {
    const schema = new faleconoscoSchema(faleconosco);

    schema.save(faleconosco, function (err, faleconoscoRetorno) {
      if (faleconoscoRetorno) {
        callback(faleconoscoRetorno);
      }else{
        callbackErro(err);
      }
    })
    .catch(err => {
      callbackErro(err);
    })
  }
}

module.exports = new faleconoscoModel(faleconoscoSchema);