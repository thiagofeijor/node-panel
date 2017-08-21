const cnpj = require('cpf_cnpj').CNPJ;
const cpf = require('cpf_cnpj').CPF;

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const administradorSchema = new Schema({
  "email": { type : String , unique : true, required : true, dropDups: true },
  "senha": String,
  "tipo": String,
  "status": String,
  "cadastro": { type: Date, default: Date.now },
});

administradorSchema.pre('save', function (next) {

  this.status = 'ativo';
  this.tipo = 'adm';

  next();

});

administradorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('administrador', administradorSchema);
