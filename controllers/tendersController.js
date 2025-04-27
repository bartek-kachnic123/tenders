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
    const { title, institutionName} = req.body;
    try {
        tendersService.validateTenderBody(req.body);
        const exists = await tenderQueries.isTenderExists(title, institutionName)
        if (exists) {
            res.render('tender-add', {message: null, errorMessage: 'Podany tytuł i insytucja juz istnieje!'});
        }

        await tenderQueries.addNewTender(req.body);
        res.render('tender-add', {message: 'Dodano!', errorMessage: null});
    } catch(error) {
        if (error.status === 400) {
            res.render('tender-add', {
                message: null,
                errorMessage: error.message
            });
            return;
        }
        next(error);
    }
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
