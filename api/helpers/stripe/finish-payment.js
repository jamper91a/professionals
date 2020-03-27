module.exports = {


  friendlyName: 'Finish stripe payment',


  description: 'Finish the strip process adding the funds to the customer',


  inputs: {
    session: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({session}) {
    try { //Find the payment and change the state
      const payment = await Payment.updateOne({stripe: session.id}).set({state: sails.config.custom.PAYMENT_STATE.FINISHED});
      //Add the fund to the customer
      const customer = await Customer.findOne({user: payment.user});
      const offer = await Offer.findOne({id: payment.offer});
      await Customer.updateOne({id: customer.id}).set({balance: (customer.balance + offer.amount + offer.bonus)});
      return {};
    } catch (e) {
      throw e;
    }
  }


};

