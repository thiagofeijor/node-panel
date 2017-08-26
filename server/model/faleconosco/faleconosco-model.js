const Model = require('../../lib/facade');
const faleconoscoSchema = require('./faleconosco-schema');
const fieldsVisibles = 'assunto texto tipo respondido';

class faleconoscoModel extends Model {
    
  listarfaleconoscos(query) {
    return faleconoscoSchema
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
                }
              ]);
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