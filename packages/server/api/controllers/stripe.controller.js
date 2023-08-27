require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getStripeCustomers = async () => {
  try {
    const customers = await stripe.customers.list({});

    return customers;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getStripeCustomers,
};
