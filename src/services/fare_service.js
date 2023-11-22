const { sequelize } = require('../models');

class FareService {
    static async calculateFare(distance) {
        try {
            // Fetch fare settings based on the distance
            const fareSetting = await sequelize.models.FareSetting.findOne({
                where: {
                    startKm: { [sequelize.Sequelize.lte]: distance },
                    endKm: { [sequelize.Sequelize.or]: [{ [sequelize.Sequelize.gt]: distance }, null] },
                },
                order: [['startKm', 'DESC']], // Assuming you want the highest range that matches the distance
            });

            if (!fareSetting) {
                throw new Error('No fare setting found for the given distance.');
            }

            // Apply pricing logic
            const fare = fareSetting.pricePerKm * distance;

            return fare;
        } catch (error) {
            console.error('Error calculating fare:', error);
            throw error;
        }
    }
}

module.exports = FareService;
