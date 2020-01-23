var requestCountry = require('request-country');
module.exports = {


  friendlyName: 'View index',


  description: 'Display create customer page and process form from that page.',
  inputs: {
    name:{
      type: "string",
    },
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
    password2: {
      type: "string",
    },
    country: {
      type: "number"
    }
  },

  exits: {
  },


  fn: async function (inputs) {
    //Get coutries
    const countryOrigin=requestCountry(this.req.ip, 'US');
    const countries = await Country.find({});
    switch (this.req.method) {
      case 'GET':
        return this.res.view('pages/customer/register/index', {layout: 'layouts/login', error: '', countries, countryOrigin: countryOrigin});
        break;
      case 'POST':
        inputs.user = {
          name: inputs.name,
          username: inputs.username,
          password: inputs.password,
          password2: inputs.password2,
          country: inputs.country
        };
        try {
          const data = await sails.helpers.customer.create(inputs.user);
          try {
            const jwt = await sails.helpers.jwt.generate(data.user, data.customer, {});
            this.res.cookie('jwt', jwt.token, sails.config.custom.jwt.cookie);
            return this.res.redirect('/');
          } catch (e) {
            throw {error: e};
          }

        } catch (e) {
          if(e.raw && e.raw.serverError && e.raw.serverError.code === 'E_INVALID_ARGINS'){
            if(e.raw.serverError.problems && e.raw.serverError.problems.length>0) {
              const error_message = e.raw.serverError.problems[0].split('\n')[0];
              return this.res.view('pages/customer/register/index', {layout: 'layouts/login', error: error_message, countries, countryOrigin: countryOrigin});
            }
          }
          return this.res.view('pages/customer/register/index', {layout: 'layouts/login', error: e, countries, countryOrigin: countryOrigin});

          // return{e};
        }

        break;
    }

  }


};