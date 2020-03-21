/* eslint-disable no-undef */
$(document).ready(function () {
});

function createPayment(offerId, cb) {
  WebServices.createPayment(offerId, function (data) {
    StripeO.redirect(data.id, function (data) {
      cb(data);
    });
  });
}

function buying(id) {
  var offerId = $('input[name=offers-'+id+']:checked', '#gateway-'+id).val();
  createPayment(offerId, function (data) {

  });
}

