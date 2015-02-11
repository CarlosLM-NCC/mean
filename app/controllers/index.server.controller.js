var User = require('mongoose').model('User');
exports.render = function(req,res){
    if (req.session.lastVisit){
        console.log(req.session.lastVisit);        
    }
    req.session.lastVisit = new Date();

    xxl = JSON.stringify(req.user);
    res.render('index',{
        title : 'Hola Mundo',
        user: req.user ? JSON.stringify(req.user) : '' ,
        img:  req.user ? req.user._doc.providerData.picture : ''
    });
};