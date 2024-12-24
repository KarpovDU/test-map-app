const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

router.get('/sources', sourceController.getSources);
router.post('/sources', sourceController.createSource);
router.put('/sources/:id', sourceController.updateSource);
router.delete('/sources/:id', sourceController.deleteSource);

module.exports = router;