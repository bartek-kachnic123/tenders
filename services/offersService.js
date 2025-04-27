const validationService = require("./validationService");

const validateOfferBody = (body) => {
    const requiredFields = ['price', 'submittedBy'];
    validationService.validateFieldsFilled(body, requiredFields);
    validationService.validatePrice(body.price);
};

module.exports = { validateOfferBody };
