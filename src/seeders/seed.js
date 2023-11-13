// seed.js
const faker = require('faker');
const User = require('../models/user');
const Trip = require('../models/trip');

const NUM_USERS = 10;
const NUM_TRIPS = 20;

async function seed() {
    // Seed users
    for (let i = 0; i < NUM_USERS; i++) {
        await User.create({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            roles: ['customer'],
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            middleName: faker.name.firstName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.phoneNumber(),
            homeAddress: faker.address.streetAddress(),
            walletBalance: faker.finance.amount(),
        });
    }

    // Retrieve user IDs
    const users = await User.findAll();
    const userIds = users.map(user => user.userId);

    // Seed trips
    for (let i = 0; i < NUM_TRIPS; i++) {
        const randomCustomer = faker.random.arrayElement(userIds);
        const randomDriver = faker.random.arrayElement(userIds);

        await Trip.create({
            customer: randomCustomer,
            driver: randomDriver,
            status: faker.random.arrayElement(['pending', 'ongoing', 'completed', 'canceled']),
            pickupLocation: faker.address.streetAddress(),
            dropoffLocation: faker.address.streetAddress(),
            startTime: faker.date.future(),
            endTime: faker.date.future(),
            fare: faker.finance.amount(),
            paymentStatus: faker.random.arrayElement(['paid', 'pending']),
            notes: faker.lorem.sentence(),
        });
    }

    console.log('Database seeded successfully.');
}

seed();
