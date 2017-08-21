const Model = require('../../lib/facade');
const usuarioSchema = require('./usuario-schema');
const arquivoModel = require('../arquivo/arquivo-model');
const fieldsVisibles = 'nome foto email lat lng';

class UsuarioModel extends Model {
    
  listarUsuarios(query) {
    return usuarioSchema
            .find(query)
            .select(fieldsVisibles)
            .populate('usuario');
  }

  findById(query) {
    return usuarioSchema
            .findById(query)
            .populate('usuario')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return usuarioSchema
            .findOne(query)
            .populate('usuario')
            .select(fieldsVisibles)
            .exec();
  }
           
  criarUsuarios(usuario, callback, callbackErro) {
    const schema = new usuarioSchema(usuario);

    usuarioSchema.findOne({"email":usuario.email})
      .populate('usuario')
      .exec()
      .then(doc => {
        if (!doc) {
          schema.save(usuario, function (err, usuarioRetorno) {
            if (usuarioRetorno) {
              arquivoModel.criararquivo(usuarioRetorno, 'foto', function(usuarioRetorno){
                usuarioRetorno.save();
                callback(usuarioRetorno);
              }, function(){
                callbackErro(err);
              })
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

module.exports = new UsuarioModel(usuarioSchema);