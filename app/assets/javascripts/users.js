/* global $ */
/* global Stripe */
$(document).on('turbolinks:load', function() {
  var form = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  Stripe.setPublishableKey($("meta[name='stripe-key']").attr('content'));
  
  submitBtn.click(function(e) {
    e.preventDefault();
    submitBtn.val("Processing").prop("disabled", true);
    
    var ccNum = $('#card_number').val();
    var cvcNum = $('#card_code').val();
    var ccMonth = $('#card_month').val();
    var ccYear = $('#card_year').val();
    
    var error = false;
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('Invalid credit card number');
    }
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('Invalid CVC');
    }
    if(!Stripe.card.validateExpiry(ccMonth, ccYear)) {
      error = true;
      alert('Invalid expiration date');
    }
    
    if (error) {
      submitBtn.val("Sign Up").prop("disabled", false);
    } else {
      Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum, 
        exp_month: ccMonth, 
        exp_year: ccYear
      }, stripeResponseHandler);
    }
    return false;
  });
  
  var stripeResponseHandler = function(status, response) {
    var token = response.id;
    form.append($('<input type="hidden" name="user[stripe_card_token]">').val(token));
    form.get(0).submit();
  };
});
  