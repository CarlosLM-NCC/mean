/**
 * Created by Carlos on 06/02/2015.
 */
module.exports = function(app){
    var index = require('../controllers/index.server.controller.js');
    app.get('/',index.render);
};