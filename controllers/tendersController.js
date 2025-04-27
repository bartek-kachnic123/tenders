const tenderQueries = require("../query/tenderQueries");
const tendersService = require("../services/tendersService");
const offerQueries = require("../query/offerQueries");
const createError = require("http-errors");

const getTenders = async (req, res, next) => {
    try {
        const tenders = await tenderQueries.getActiveTenders()
        res.render('tenders', {tenders: tenders});
    } catch (error) {
        next(error);
    }
}

const getTenderDetails = async (req, res, next) => {
    try {
        const tenderId = req.params.id;
        const tender = await tenderQueries.getTenderById(tenderId);
        if (!tender) {
            return next(createError(404));
        }
        const isTenderActive = tendersService.isTenderActive(tender);

        if (isTenderActive) {
            tender.offers = await offerQueries.getOffersById(tenderId);
        }
        else {
            tender.offers = await offerQueries.getOffersByIdFilterAndOrder(tenderId, tender.maxPrice);
        }

        res.render('tender-details', {tender: tender, isTenderActive: isTenderActive,
        message: null, errorMessage: null});
    } catch (error) {
        next(error);
    }
}

const addNewTender = async (req, res, next) => {
    let message = null;
    let errorMessage = null;
    const MESSAGE_TENDER_ADDED = 'Dodano!';

    try {
        tendersService.validateTenderBody(req.body);
        await tendersService.addTender(req.body);
        message = MESSAGE_TENDER_ADDED;
    } catch(error) {
        if (error.status === 400) {
            errorMessage = error.message;
        }
        else next(error);
    }

    res.render('tender-add', {message: message, errorMessage: errorMessage});
}

const getAddTender = async (req, res, next) => {
    res.render('tender-add', {message: null, errorMessage: null});
}

const getEndedTenders = async(req, res, next) => {
    try {
        const endedTenders = await tenderQueries.getEndedTenders();
        res.render('tenders-ended',{endedTenders: endedTenders});
    } catch (error) {
        next(error);
    }
}

module.exports = {getTenders, getTenderDetails, addNewTender, getAddTender, getEndedTenders};
