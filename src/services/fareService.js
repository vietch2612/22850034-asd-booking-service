// services/fareService.js
const calculateFare = async (tripLength) => {
    // Calculate fare based on trip length
    let fare = 0;
    let tripLengthInKm = tripLength / 1000;

    // First one km: 15,000
    // From second km to next 10km: 10,000
    // Next km: 5,000

    if (tripLengthInKm > 0) {
        // First kilometer
        fare += 15000;

        // Next 10 kilometers
        if (tripLengthInKm > 1 && tripLengthInKm <= 11) {
            fare += 10000 * Math.min(tripLengthInKm - 1, 10);
        } else if (tripLengthInKm > 11) {
            // Remaining distance beyond the first 11 kilometers
            fare += 5000 * Math.max(tripLengthInKm - 11, 0);
        }
    }

    return fare;
};

module.exports = { calculateFare };
