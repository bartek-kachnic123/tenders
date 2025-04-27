const db = require("../models/index");

const createNewOffer = async (offer, options = {}) => {
    await db.Offer.create(offer, options);
}

const getOffersById = async (tenderId) => {
    return db.Offer.findAll({
        where: { tenderId }
    });
};

const getOffersByIdFilterAndOrder = async (tenderId, maxPrice) => {
    return db.Offer.findAll({
        where: {
            tenderId,
            price: {
                [db.Sequelize.Op.lte]: maxPrice
            }
        },
        order: [
            ['price', 'ASC']
        ],
    });
};

module.exports = { createNewOffer, getOffersById, getOffersByIdFilterAndOrder };
