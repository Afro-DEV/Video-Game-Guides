const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.get('/', guideController.guide_index);

router.post('/', guideController.guide_create_post); 

router.get('/create', guideController.guide_create_get);

router.get('/:id', guideController.guide_details);

router.delete('/:id', guideController.guide_delete);

module.exports = router;