const validationService = require('./validationService');
const tenderQueries = require('../query/tenderQueries');
const db = require('../models/index');

const createError = require("http-errors");

const isTenderActive = (tender) => {
    const offerEndDate = new Date(tender.offerEndDate);
    offerEndDate.setSeconds(0, 0);
    return new Date() <= offerEndDate;
}

const validateTenderBody = (body) => {
    const requiredFields = ["title", "offerStartDate", "offerEndDate",
                                    "institutionName", "description", "maxPrice"];
    validationService.validateFieldsFilled(body, requiredFields);


    const startDate = new Date(body.offerStartDate);
    const endDate = new Date(body.offerEndDate);

    validationService.validateDateFormat(startDate, 'Nieprawidłowy format daty rozpoczęcia.');
    validationService.validateDateFormat(endDate, 'Nieprawidłowy format daty zakończenia.');

    const now = new Date();
    now.setSeconds(0, 0);
    startDate.setSeconds(0, 0);

    if (startDate < now) {
        throw createError(400, 'Data rozpoczęcia musi być równa lub późniejsza niż obecny czas.');
    }

    endDate.setSeconds(0, 0);
    if (startDate >= endDate) {
        throw createError(400, 'Data rozpoczęcia musi być wcześniejsza niż data zakończenia.');
    }

    validationService.validatePrice(body.maxPrice);
};


const addTender = async (tender) => {
    const {title, institutionName} = tender;
    return await db.sequelize.transaction(async (transaction) => {
        const exists = await tenderQueries.isTenderExists(title, institutionName, { transaction });

        if (exists) {
            throw createError(400, 'Podany tytuł i instytucja już istnieją!');
        }

        await tenderQueries.addNewTender(tender, { transaction });
    });
};


module.exports = { isTenderActive, validateTenderBody, addTender }
