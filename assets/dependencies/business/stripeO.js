class StripeO {

  static init(){
    console.log('initStripe');
    this.stripe =  new Stripe(window.SAILS_LOCALS.STRIPE);
  }

  static getStripe(){
    if(this.stripe) {
      return this.stripe;
    } else {
      this.stripe =  new Stripe(window.SAILS_LOCALS.STRIPE);
      return this.stripe;
    }
  }
  static redirect(sessionId, cb){
      this.getStripe().redirectToCheckout({
        sessionId: sessionId
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        cb(result);
      });
  }


}



