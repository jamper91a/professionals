module.exports = {


  friendlyName: 'View all',


  description: 'Display "All" page.',


  exits: {

  },


  fn: async function () {

    try {
      const professionals = await sails.helpers.professional.findAll();
      return this.res.view(
        'pages/admin/professional/all',
        {
          layout: 'layouts/admin',
          professionals: professionals,
          translations: {
            Successful_Operation:sails.__('Successful_Operation')}
        });
    } catch (e) {
      throw {serverError: e};
    }

  }


};
