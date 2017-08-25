const Model = require('../../lib/facade');
const chatSchema = require('./chat-schema');
const fieldsVisibles = 'texto _id1 _id2 status cadastro';

class chatModel extends Model {
    
  listarchats(query) {
    return chatSchema
              .aggregate([
                { $match:
                  query },
                { $sort: 
                  {cadastro: 1}
                },
                { $lookup: {
                    from: "usuarios", 
                    localField: "_id1",
                    foreignField: "_id",
                    as: "usuario1"
                  }
                },
                { $lookup: {
                    from: "usuarios", 
                    localField: "_id2",
                    foreignField: "_id",
                    as: "usuario2"
                  }
                },
                { "$project": {
                  "texto": 1,
                  "_id1": 1,
                  "_id2": 1,
                  "status": 1,
                  "cadastro": 1,
                  "usuario1._id": { "$arrayElemAt": [ "$usuario1._id", 0 ] },
                  "usuario1.nome": { "$arrayElemAt": [ "$usuario1.nome", 0 ] },
                  "usuario1.foto": { "$arrayElemAt": [ "$usuario1.foto", 0 ] },
                  "usuario2._id": { "$arrayElemAt": [ "$usuario2._id", 0 ] },
                  "usuario2.nome": { "$arrayElemAt": [ "$usuario2.nome", 0 ] },
                  "usuario2.foto": { "$arrayElemAt": [ "$usuario2.foto", 0 ] }
                }}
              ]);
  }

  listarchat(query) {
    return chatSchema
            .aggregate([
              { $match:
                query },
              { $sort: 
                {cadastro: 1}
              },
              { $lookup: {
                  from: "usuarios", 
                  localField: "_id1",
                  foreignField: "_id",
                  as: "usuario1"
                }
              },
              { $lookup: {
                  from: "usuarios", 
                  localField: "_id2",
                  foreignField: "_id",
                  as: "usuario2"
                }
              },
              { $group: { _id: {usuario1:"$usuario1", usuario2:"$usuario2"},count: { $sum: 1 } }}
            ]);
  }

  findById(query) {
    return chatSchema
            .findById(query)
            .populate('chat')
            .select(fieldsVisibles)
            .exec();
  }

  findByOne(query){
    return chatSchema
            .findOne(query)
            .populate('chat')
            .select(fieldsVisibles)
            .exec();
  }
           
  criarchats(chat, callback, callbackErro) {
    const schema = new chatSchema(chat);

    schema.save(chat, function (err, chatRetorno) {
      if (chatRetorno) {
        callback(chatRetorno);
      }else{
        callbackErro(err);
      }
    })
    .catch(err => {
      callbackErro(err);
    })
  }
}

module.exports = new chatModel(chatSchema);