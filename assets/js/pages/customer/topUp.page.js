var stripe = Stripe('pk_test_jL5O5x8MhXW1TJuhoNxY3TLu00VhZo5Awb');

function payButton() {
  stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: 'cs_test_WnGcYaVSVZcEcjQfZXL4rzAUI6V52x0NTdaHB7jV7BZcfqPTUsTm9b81'
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  });
}
