module.exports = {


  friendlyName: 'Create',


  description: 'Create customer.',


  inputs: {
    user:{
      type: "json",
      required: true,
      custom: function(user) {
        return _.isObject(user) &&
          _.isString(user.name) &&
          _.isString(user.username) &&
          //Validate password
          (_.isString(user.password) && user.password.length >= 6 && user.password.match(/[a-z]/i) && user.password.match(/[0-9]/)) &&
          _.isNumber(user.country);
      }
    }
  },


  exits: {
    success: {
    },
    serverError: {
      description: 'An general error',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs, exits) {
    //Create user
    try {
      inputs.user.group = sails.config.custom.USER_CUSTOMER;
      var user = await User.create(inputs.user).fetch();
      if(user){
        var customer = {
          balance: 0,
          user: user.id,
          picture: "",
        };
        var newCustomer  = await Customer.create(customer).fetch();
        if(newCustomer){
          return  exits.success(newCustomer);
        }else{
          exits.serverError("Customer not created");
        }
      }else{
        exits.serverError("User not created");
      }

    } catch (e) {
      return exits.serverError(e);
    }

  }


};
