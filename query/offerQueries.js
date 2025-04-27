const db = require("../models/index");

const createNewOffer = async (offer, options = {}) => {
    await db.Offer.create(offer, options);
}

module.exports = { createNewOffer };