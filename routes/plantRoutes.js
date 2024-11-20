const express = require('express');
const {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant,
} = require('../controllers/plantController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getPlants);
router.post('/', protect, createPlant);
router.put('/:id', protect, updatePlant);
router.delete('/:id', protect, deletePlant);

module.exports = router;
