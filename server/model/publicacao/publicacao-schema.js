const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const publicacaoSchema = new Schema({
  "_iduser": {type: Schema.Types.ObjectId, ref: 'usuario' },
  "titulo": String,
  "categoria": String,
  "texto": String,
  "lat": String,
  "lng": String,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

publicacaoSchema.pre('save', function (next) {

  this.status = 'ativo';
  next();

});

publicacaoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('publicacao', publicacaoSchema);
