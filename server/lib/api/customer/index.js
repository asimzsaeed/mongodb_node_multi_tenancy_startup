'use strict';
var express = require('express'),
    router = express.Router(),
    controller = require('./controller');

router.get('/', controller.query);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
