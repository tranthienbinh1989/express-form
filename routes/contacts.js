var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET contact page. */
router.get('/', function(req, res) {
  res.render('contact');
});

router.post('/', function(req, res) {
    req.assert('fname', 'Full name is required.').notEmpty();
    req.assert('message', 'Message is required.').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.render('contact', {'errors': errors})
    }
    else {
        var content = req.body.fname + '\n' + req.body.type + '\n' + req.body.message
        fs.writeFile('message.txt', content, function(err){
            if(err) throw err;
            console.log("It's saved");
        });    
        res.render('contact');
    }
});

module.exports = router;
