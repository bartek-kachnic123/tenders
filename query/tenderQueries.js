const db = require('./models/index');

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
                [db.Sequelize.Op.lt]: new Date()
            }
        }
    });
}

module.exports = {getActiveTenders, getEndedTenders};
