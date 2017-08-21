var mongoose = require('mongoose');
const Controller = require('../../lib/controller');
const arquivoModel = require('./arquivo-model');
const config = require('../../../config');

class arquivoController extends Controller {

    findById(req, res, next) {
        arquivoModel.findById(req.params.id)
            .then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }

                var type = doc.foto.split(",")[0].replace(';base64','').replace('data:','');

                var img = new Buffer(doc.foto.split(",")[1], 'base64');

                res.writeHead(200, {
                    'Content-Type': type,
                    'Content-Length': img.length
                });
                res.end(img); 
            })
            .catch(err => {
                console.log("no catch do model");
                next(err)
            });
    }

}

module.exports = new arquivoController(arquivoModel);