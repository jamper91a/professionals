const stripe = require('stripe')(sails.config.custom.STRIPE.SECRET);
module.exports = {


  friendlyName: 'Check signature of a webhook on stripe',


  description: 'Validate the webhook event has no been altered',


  inputs: {
    body: {
      type: 'ref',
      required: true
    },
    sig: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    notValid: {
      description: 'Signature not valid'
    }

  },


  fn: async function (inputs) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(inputs.body, inputs.sig, sails.config.custom.STRIPE.WEBHOOKS.SIGNATURE);
      return event;
    }
    catch (err) {
      sails.log.error(err);
      throw 'notValid';
    }
  }


};

