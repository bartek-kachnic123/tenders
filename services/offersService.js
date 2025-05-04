const validationService = require('./validationService');
const tenderQueries = require('../query/tenderQueries');
const offerQueries = require('../query/offerQueries');
const tendersService = require('../services/tendersService');
const db = require('../models/index');
const createError = require('http-errors');

const validateOfferBody = (body) => {
    const requiredFields = ['price', 'submittedBy'];
    validationService.validateFieldsFilled(body, requiredFields);
    validationService.validatePrice(body.price);
};

const createNewOffer = async (tenderId, submittedBy, price) => {
    return await db.sequelize.transaction(async (transaction) => {
        const tender = await tenderQueries.getTenderById(tenderId, { transaction });
        if (!tender) {
            throw createError(404, 'Nie istnieje przetarg o takim Id.');
        }

        const isTenderActive = tendersService.isTenderActive(tender);
        if (!isTenderActive) {
            return;
        }

        await offerQueries.createNewOffer({
            submittedBy,
            price,
            tenderId
        }, { transaction });
    });
};

module.exports = { validateOfferBody, createNewOffer };
