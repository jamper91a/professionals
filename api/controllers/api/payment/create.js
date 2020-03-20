module.exports = {


  friendlyName: 'Create',


  description: 'Create payment.',


  inputs: {
    offerId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    notAuthorized: {
      description: 'Just customer should create payments'
    },
    offerNotValid: {
      description: 'Offer not valid'
    }
  },


  fn: async function (inputs) {

    if(this.req.customer) {
      //Find the offer
      const offer = await Offer.findOne({id: inputs.offerId}).populate('domain').populate('gateway');
      if(offer) {
        //Get the details of the currency
        const currency = await Currency.findOne({id: offer.domain.currency});
        let options;
        if(offer.options) {
          options = offer.options;
        } else {
          options = {};
        }
        options.currency = currency.symbol;

        switch (offer.gateway.name) {
          case sails.config.custom.GATEWAYS.STRIPE:
            const session = await sails.helpers.stripe.createCheckoutSession.with(options);
            return session;
            break;
          case sails.config.custom.GATEWAYS.PAYPAL:
            break;
        }
      } else {
        throw 'offerNotValid';
      }
    } else {
      throw 'notAuthorized';
    }

  }


};
