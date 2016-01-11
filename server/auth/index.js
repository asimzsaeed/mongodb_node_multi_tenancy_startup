'use strict';
var express = require('express'),
    router = express.Router(),
    controller = require('./controller');

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/verifyDomain', controller.verifyDomain);

router.get('/SuggestUrls/:domain', controller.SuggestUrls);
router.get('/checkURL/:domain', controller.checkURL);
router.get('/checkUsername/:username', controller.checkUsername);

module.exports = router;