module.exports = {


  friendlyName: 'Find one customer',


  description: 'Function to find one specific customer ',


  inputs: {
    customerId:{
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    notFound: {
      description: 'Customer not found'
    }

  },


  fn: async function ({customerId}) {
    let customer = await Customer.findOne({id: customerId})
      .populate('user');
    if(customer)
      return customer;
    else
      throw 'notFound';
  }


};

