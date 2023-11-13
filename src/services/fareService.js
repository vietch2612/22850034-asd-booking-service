// services/fareService.js
const calculateFare = async (tripLength) => {
    // Calculate fare based on trip length
    let fare = 0;

    if (tripLength > 0) {
        // First kilometer
        fare += 15000;

        // Next 10 kilometers
        if (tripLength > 1 && tripLength <= 11) {
            fare += 10000 * Math.min(tripLength - 1, 10);
        } else if (tripLength > 11) {
            // Remaining distance beyond the first 11 kilometers
            fare += 5000 * Math.max(tripLength - 11, 0);
        }
    }

    return fare;
};

module.exports = { calculateFare };
