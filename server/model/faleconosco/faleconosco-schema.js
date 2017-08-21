const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const faleconoscoSchema = new Schema({
  "_iduser": {type: Schema.Types.ObjectId, ref: 'usuario' },
  "assunto": String,
  "texto": String,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

faleconoscoSchema.pre('save', function (next) {

  this.status = 'ativo';
  next();

});

faleconoscoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('faleconosco', faleconoscoSchema);
