var requestCountry = require('request-country');
module.exports = {


  friendlyName: 'View register',


  description: 'Display create professional page and process form from that page.',

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
    },
    profession: {
      type: "number"
    },
    rate: {
      type: "number"
    }
  },

  exits: {

  },


  fn: async function (inputs) {

    //Get coutries
    const countryOrigin=requestCountry(this.req.ip, 'US');
    const countries = await Country.find({});
    const rates = await Rate.find({});
    const professions = await Profession.find({});
    switch (this.req.method) {
      case 'GET':
        return this.res.view('pages/professional/register', {layout: 'layouts/login', error: '', countries, rates, professions, countryOrigin: countryOrigin});
        break;
      case 'POST':
        let dataProfessional = {};
        dataProfessional.user = {
          name: inputs.name,
          username: inputs.username,
          password: inputs.password,
          password2: inputs.password2,
          country: inputs.country
        };
        dataProfessional.profession = inputs.profession;
        dataProfessional.rate = inputs.rate;
        try {
          const data = await sails.helpers.professional.create.with(dataProfessional);
          try {
            const jwt = await sails.helpers.jwt.generate(data.user, {}, data.professional);
            this.res.cookie('jwt', jwt.token, sails.config.custom.jwt.cookie);
            return this.res.redirect('/');
          } catch (e) {
            throw {error: e};
          }

        } catch (e) {
          if(e.raw && e.raw.serverError && e.raw.serverError.code === 'E_INVALID_ARGINS'){
            if(e.raw.serverError.problems && e.raw.serverError.problems.length>0) {
              const error_message = e.raw.serverError.problems[0].split('\n')[0];
              return this.res.view('pages/professional/register', {layout: 'layouts/login', error: error_message, countries, countryOrigin: countryOrigin});
            }
          }
          return this.res.view('pages/professional/register', {layout: 'layouts/login', error: e, countries, countryOrigin: countryOrigin});

          // return{e};
        }

        break;
    }

  }


};
