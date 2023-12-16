const { sequelize } = require('../models');

class FareService {
    static calculateFare = async (tripLength, serviceTypeId) => {
        try {
            const fareSettings = await sequelize.models.FareSetting.findAll();
            const serviceType = await sequelize.models.ServiceType.findByPk(serviceTypeId, {
                attributes: ['surcharge'],
            });

            let totalFare = 0;
            let remainingDistance = tripLength;

            for (const setting of fareSettings) {
                if (remainingDistance > 0) {
                    const distanceToCharge = Math.min(remainingDistance, setting.endKm - setting.startKm);
                    totalFare += distanceToCharge * setting.pricePerKm;
                    remainingDistance -= distanceToCharge;
                } else {
                    break; // Exit loop if we've covered the entire trip length
                }
            }

            const surcharge = serviceType ? serviceType.surcharge / 100 : 0;

            return (totalFare + totalFare * surcharge).toFixed(0);
        } catch (error) {
            logger.error('Error calculating trip fare:', error);
            throw error;
        }
    }
}

module.exports = FareService;
