const createError = require("http-errors");

const validateFieldsFilled = (body, requiredFields) => {
    for (const field of requiredFields) {
        const value = body[field];
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
            throw createError(400, 'Wszystkie pola są wymagane!');
        }
    }
}

const validatePrice = (price) => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw createError(400, 'Cena musi być poprawną dodatnią liczbą.');
    }
}

const validateDateFormat = (date, message) => {
    if (isNaN(date.getTime())) {
        throw createError(400, message);
    }
}
module.exports = { validateFieldsFilled, validatePrice, validateDateFormat };
