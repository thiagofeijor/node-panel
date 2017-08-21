const Model = require('../../lib/facade');
const arquivoSchema = require('./arquivo-schema');
const fieldsVisibles = 'foto';

class arquivoModel extends Model {
    
  listararquivos(query) {
    return arquivoSchema
            .find(query)
            .select(fieldsVisibles);
  }

  findById(query) {
    return arquivoSchema
            .findById(query)
            .select(fieldsVisibles)
            .exec();
  }

  criararquivo(json, key, callback, callbackErro) {
    const schema = new arquivoSchema({"foto":json[key]});

    schema.save(json[key], function (err, arquivoRetorno) {
        if (arquivoRetorno) {
            arquivoRetorno.save();
            json[key] = arquivoRetorno._id;
            callback(json);
        }else{
            callbackErro(err);
        }
    })
    
  }
}

module.exports = new arquivoModel(arquivoSchema);