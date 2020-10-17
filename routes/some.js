const express = require('express');
const SomeController = require('../controllers/some.controller');

const router = express.Router();

// register controllers
const someController = new SomeController();
someController.register(router);

module.exports = router;
