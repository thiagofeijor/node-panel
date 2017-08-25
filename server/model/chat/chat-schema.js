const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const normalizer = require('../../lib/normalize');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  "_id1": {type: Schema.Types.ObjectId, ref: 'usuario' },
  "_id2": {type: Schema.Types.ObjectId, ref: 'chat' },
  "texto": String,
  "status": String,
  "_exclusao": [],
  "cadastro": { type: Date, default: Date.now },
});

chatSchema.pre('save', function (next) {

  this.status = 'ativo';
  next();

});

chatSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('chat', chatSchema);
