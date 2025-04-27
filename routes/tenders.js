const express = require('express');
const router = express.Router();
const tendersController = require('../controllers/tendersController');
const offersController = require('../controllers/offersController');

router.get('/', tendersController.getTenders);
router.get('/id/:id', tendersController.getTenderDetails);
router.post('/id/:id', offersController.submitNewOffer);
router.get('/dodaj',tendersController.getAddTender);
router.post('/dodaj',tendersController.addNewTender);
router.get('/zakonczone', tendersController.getEndedTenders)
module.exports = router;