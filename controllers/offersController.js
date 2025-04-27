const offerQueries = require("../query/offerQueries");
const tenderQueries = require("../query/tenderQueries");
const tendersService = require("../services/tendersService");
const offersService = require("../services/offersService");
const createError = require("http-errors");

const submitNewOffer = async (req, res, next) => {
    const { submittedBy, price } = req.body;
    const tenderId = req.params.id;
    const MESSAGE_OFFER_ADDED = 'Dodano!';
    let isTenderActive;
    let tenderDetails;

    try {
        const tender = await tenderQueries.getTenderById(tenderId);
        isTenderActive = tendersService.isTenderActive(tender);
        offersService.validateOfferBody(req.body);

        await offerQueries.createNewOffer({
            submittedBy,
            price,
            tenderId
        }, {});

        tenderDetails = await tenderQueries.getTenderDetails(tenderId);
        res.render('tender-details', {
            tender: tenderDetails,
            isTenderActive: isTenderActive,
            message: MESSAGE_OFFER_ADDED,
            errorMessage: null
        });

    } catch (error) {
        if (error.status === 400) {
            tenderDetails = await tenderQueries.getTenderDetails(tenderId);

            res.render('tender-details', {
                tender: tenderDetails,
                isTenderActive: isTenderActive,
                message: null,
                errorMessage: error.message
            });
            return;
        }
        next(createError(500, 'Wystąpił błąd podczas dodawania oferty.'));
    }
};

module.exports = { submitNewOffer }