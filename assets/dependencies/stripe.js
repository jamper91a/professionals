class Stripe {

  static init(){
    this.stripe =  new Stripe(window.SAILS_LOCALS.STRIPE);
  }
  static redirect(sessionId, cb){
    if(this.stripe) {
      this.stripe.redirectToCheckout({
        sessionId: sessionId
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        cb(result);
      });
    } else {
      throw 'Stripe not init';
    }
  }


}



