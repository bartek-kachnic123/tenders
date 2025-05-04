const createError = require('http-errors');

const validateFieldsFilled = (body, requiredFields) => {
    let value;
    for (const field of requiredFields) {
        value = body[field];
        if (typeof value === 'string') {
            value = value.trim();
            body[field] = value;
        }
        if (value === undefined || value === null || (value === '')) {
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
