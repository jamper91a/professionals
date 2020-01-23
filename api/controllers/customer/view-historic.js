module.exports = {


  friendlyName: 'View historic',


  description: 'Display "Historic" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/customer/historic'
    }

  },


  fn: async function () {

    const historic = await sails.helpers.customer.historic();
    return historic;

  }


};