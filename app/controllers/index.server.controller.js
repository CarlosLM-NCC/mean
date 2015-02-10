var User = require('mongoose').model('User');
exports.render = function(req,res){
    if (req.session.lastVisit){
        console.log(req.session.lastVisit);        
    }
    req.session.lastVisit = new Date();

    
    res.render('index',{
        title : 'Hola Mundo',
        userFullName: req.user ? req.user.fullName : '',
        img:  req.user ? req.user._doc.providerData.picture : ''
    });
};