const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const notificacaoSchema = new Schema({
  "_iduser": {type: Schema.Types.ObjectId, ref: 'usuario' },
  "texto": String,
  "tipo": String,
  "confirmado": Boolean,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

notificacaoSchema.pre('save', function (next) {

  this.confirmado = false;
  this.status = 'ativo';
  next();

});

notificacaoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('notificacao', notificacaoSchema);
