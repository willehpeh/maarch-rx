const express = require('express');
const router = express.Router();
const dynamicFormCtrl = require('../controllers/dynamic-form');

router.get('/', dynamicFormCtrl.getDynamicForm);

module.exports = router;
