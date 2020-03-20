const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
module.exports = {


  friendlyName: 'Create checkout session',


  description: 'For one-time payments, create a Session with line_items. Line items represent a list of items the customer is purchasing',


  inputs: {
    payment_method_types: {
      type: 'ref',
      description: 'Array of payment methods',
      example: '["card"]',
      defaultsTo: ['card']
    },
    name: {
      type: 'string',
      description: 'Name of the product to buy',
      example: 'Recharge $10',
      required: true
    },
    description: {
      type: 'string',
      description: 'Description of what is going to pay',
      example: '$10 plus $3 bonus',
      required: false
    },
    images: {
      type: 'string',
      description: 'Image of what is going to be bought',
      example: '$10 plus $3 bonus',
      required: false
    },
    amount: {
      type: 'number',
      description: 'Amount of money to be charge',
      example: 500,
      required: true
    },
    currency: {
      type: 'string',
      description: 'Currency of what is going to be charge',
      example: 'usd, nzd, etc',
      required: true
    },
    quantity: {
      type: 'number',
      description: 'Amount of times is going to be executed',
      example: 1,
      defaultsTo: 1
    },
    success_url: {
      type: 'string',
      description: 'Url to be redirected after the payment was successful',
      example: 'https://example.com/success',
      required: true
    },
    cancel_url: {
      type: 'string',
      description: 'Url to be redirected after the payment was successful',
      example: 'https://example.com/cancel',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    console.log(inputs);
    const session = await stripe.checkout.sessions.create({
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
      payment_method_types: inputs.payment_method_types,
      line_items: [{
        name: inputs.name,
        description: inputs.description,
        images: inputs.images,
        amount: inputs.amount,
        currency: inputs.currency,
        quantity: inputs.quantity,
      }],
      success_url: inputs.success_url,
      cancel_url: inputs.cancel_url,
    });
    return session;
  }


};

