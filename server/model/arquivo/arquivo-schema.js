const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const arquivoSchema = new Schema({
  "foto": String,
  "status": String,
  "data": { type: Date, default: Date.now },
});

arquivoSchema.pre('save', function (next) {
  
  this.status = 'ativo';
  next();

});

arquivoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('arquivo', arquivoSchema);
