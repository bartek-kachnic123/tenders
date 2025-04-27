const db = require('../models/index');

const getActiveTenders = async () => {
    const now = new Date();
    return await db.Tender.findAll({
        where: {
            offerStartDate: {
                [db.Sequelize.Op.lte]: now
            },
            offerEndDate: {
                [db.Sequelize.Op.gte]: now
            }
        }
    });
};

const getEndedTenders = async () => {
    return await db.Tender.findAll({
        where: {
            offerEndDate: {
                [db.Sequelize.Op.lte]: new Date()
            }
        }
    });
}

const getTenderDetails = async (tenderId, options = {}) => {
    return await db.Tender.findByPk(tenderId, {
        include: [
            {
                model: db.Offer,
                as: 'offers',
            },
        ],
        transaction: options.transaction
    });
};

const addNewTender = async (tender) => {
    await db.Tender.create(tender);
}

const isTenderExists = async (title, institutionName) => {
    const tender = await db.Tender.findOne({ where: { title, institutionName } });
    return !!tender;
}

const getTenderById = async (tenderId, options = {}) => {
    return await db.Tender.findByPk(tenderId, { transaction: options.transaction });
}


module.exports = {
    getActiveTenders, getEndedTenders, getTenderDetails, addNewTender,
    isTenderExists, getTenderById
};
