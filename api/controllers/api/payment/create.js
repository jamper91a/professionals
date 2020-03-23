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
    try {
      let data = {};

      if (this.req.customer) {
        //Find the offer
        const offer = await Offer.findOne({id: inputs.offerId}).populate('domain').populate('gateway');
        if (offer) {
          //Get the details of the currency
          const currency = await Currency.findOne({id: offer.domain.currency});
          let options;
          if (offer.options) {
            options = offer.options;
          } else {
            options = {};
          }
          options.currency = currency.symbol;


          switch (offer.gateway.name) {
            case sails.config.custom.GATEWAYS.STRIPE:
              const session = await sails.helpers.stripe.createCheckoutSession.with(options);
              //Save the information of the process in the database
              await Payment.create({
                user: this.req.user.id,
                offer: offer.id,
                state: sails.config.custom.PAYMENT_STATE.CREATED,
                stripe: session.id,
                information: session
              });
              data = session;
              break;
            case sails.config.custom.GATEWAYS.PAYPAL:
              break;
          }
          return data;
        } else {
          throw 'offerNotValid';
        }
      } else {
        throw 'notAuthorized';
      }
    } catch (e) {
      sails.log.error(e);
      return this.res.serverError(e);
    }

  }


};
