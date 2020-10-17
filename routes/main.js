const express = require('express');
const EventController = require('../controllers/event.controller');

const router = express.Router();

// register controllers
const eventController = new EventController();
eventController.register(router);

module.exports = router;
