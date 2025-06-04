const express = require('express');
const { sendContactEmail } = require('../controller/Contact.Controller');
const router = express.Router();

router.post('/contact', sendContactEmail);

module.exports = router;
