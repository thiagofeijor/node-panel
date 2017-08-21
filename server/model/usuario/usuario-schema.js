const cnpj = require('cpf_cnpj').CNPJ;
const cpf = require('cpf_cnpj').CPF;

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  "nome": String,
  "email": { type : String , unique : true, required : true, dropDups: true },
  "senha": String,
  "foto": String,
  "lat": String,
  "lng": String,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

usuarioSchema.pre('save', function (next) {

  this.status = 'ativo';

  next();

});

usuarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Usuario', usuarioSchema);
