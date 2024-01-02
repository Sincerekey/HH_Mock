const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    console.log(req.session);
    res.render('search', {title: 'Home', Name: req.session.user.first_name});
})



module.exports = router;