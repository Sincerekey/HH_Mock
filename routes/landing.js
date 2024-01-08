var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('landing', {title: 'Home', Name: req.session.user.first_name});
});

module.exports = router;
