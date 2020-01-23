const passport = require('passport');

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    req: { type: "ref"},
    res: { type: "ref"},
    username: {
      type: "string",
      custom: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validation = re.test(String(value).toLowerCase());
        return validation;
      }
    },
    password: {
      type: "string"
    },
  },


  exits: {

    success: {
    },
    error: {
    },
    notFound: {
    }

  },


  fn: async function (inputs) {

    const promise = new Promise(function(resolve, reject) {
      try {
        passport.authenticate('local', async function (err, user, info) {
          if (!user) {
            let error = new Error('notFound');
            error.code = 'notFound';
            reject(error);
            // throw {notFound: {}};
          }
          if (err) {
            reject(e);
            // throw {error: e};
          }

          if (user) {
            //Check if is customer or professional
            let customer, professional;
            switch (user.group) {
              case sails.config.custom.USER_CUSTOMER:
                customer = await Customer.find({user: user.id});
                break;
              case sails.config.custom.USER_PROFESSIONAL:
                professional = await Professional.find({user: user.id});
                break;
            }
            try {
              const data = sails.helpers.jwt.generate(user, customer, professional);
              resolve(data);
            } catch (e) {
              throw {error: e};
            }


          }


        })(inputs.req, inputs.res);
      } catch (e) {
        throw {error: e};
      }
    });
    return promise;
  }


};

