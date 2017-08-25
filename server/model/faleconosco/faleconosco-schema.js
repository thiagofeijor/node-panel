const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const faleconoscoSchema = new Schema({
  "_iduser": {type: Schema.Types.ObjectId, ref: 'usuario' },
  "_idretorno": {type: Schema.Types.ObjectId, ref: 'faleconosco' },
  "assunto": String,
  "texto": String,
  "tipo": String,
  "respondido": String,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

faleconoscoSchema.pre('save', function (next) {

  if(!this.tipo){
    this.tipo = 'saida';
  }
  
  this.respondido = 'nao';
  this.status = 'ativo';
  next();

});

faleconoscoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('faleconosco', faleconoscoSchema);
