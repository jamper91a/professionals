module.exports = {


  friendlyName: 'Create',


  description: 'Create customer.',


  inputs: {
    user:{
      type: "json",
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    //Create user
    try {
      inputs.user.group = sails.config.custom.USER_CUSTOMER;
      const newUser = await sails.helpers.user.create.with(inputs.user);
      if(newUser){
        const customer = {
          balance: 0,
          user: newUser.id,
          picture: "",
        };
        const newCustomer  = await Customer.create(customer).fetch();
        if(newCustomer){
          return newCustomer;
        }else{
          throw {serverError: {message: "Customer not created"}};
        }
      }else{
        throw {serverError: {message: "User not created"}};
      }

    } catch (e) {
      throw {serverError: e};
    }
  }


};

