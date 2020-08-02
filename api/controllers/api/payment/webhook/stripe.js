module.exports = {


  friendlyName: 'Stripe',


  description: 'Stripe webhook.',


  inputs: {
  },


  exits: {

  },


  fn: async function () {
    const sig = this.req.headers['stripe-signature'];
    try {
      const event = await sails.helpers.stripe.validateSignature(this.req.body, sig);
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          await sails.helpers.stripe.finishPayment(session);
          break;
        default:
          // Unexpected event type
          return response.status(400).end();
      }
    } catch (e) {
      throw e;
    }
    // All done.
    return {};

  }


};
