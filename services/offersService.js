const validationService = require("./validationService");

const validateOfferBody = (body) => {
    const requiredFields = ['price', 'submittedBy'];
    validationService.validateFieldsFilled(body, requiredFields);
    validationService.validatePrice(body.price);
};

const filterAndSort = (offers, maxPrice) => {
    return offers
        .filter(offer => parseFloat(offer.price) <= parseFloat(maxPrice))
        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}

module.exports = { validateOfferBody, filterAndSort };
