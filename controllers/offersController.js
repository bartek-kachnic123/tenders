const tenderQueries = require('../query/tenderQueries');
const tendersService = require('../services/tendersService');
const offersService = require('../services/offersService');


const submitNewOffer = async (req, res, next) => {
    const { submittedBy, price } = req.body;
    const tenderId = req.params.id;
    const MESSAGE_OFFER_ADDED = 'Dodano!';
    let successMessage = null;
    let errorMessage = null;

    try {
        offersService.validateOfferBody(req.body);
        await offersService.createNewOffer(tenderId, submittedBy, price);
        successMessage = MESSAGE_OFFER_ADDED;
    } catch (error) {
        if (error.status === 400) {
            errorMessage = error.message;
        }
        else next(error);
    }

    try {
        const tenderDetails = await tenderQueries.getTenderDetails(tenderId);
        res.render('tender-details', {
            tender: tenderDetails,
            isTenderActive: tendersService.isTenderActive(tenderDetails),
            message: successMessage,
            errorMessage: errorMessage
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitNewOffer }