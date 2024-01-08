var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    res.render('kids', { Name: req.session.user.first_name});
});

module.exports = router;
