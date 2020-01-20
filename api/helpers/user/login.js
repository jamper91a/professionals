const passport = require('passport');
const jwt = require('jsonwebtoken');
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
      type: "string",
      custom: function (value) {
        return value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
      }
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
        passport.authenticate('local', function (err, user, info) {
          if (!user) {
            reject(new Error('notFound'));
            // throw {notFound: {}};
          }
          if (err) {
            reject(e);
            // throw {error: e};
          }

          if (user) {
            try {
              const token = jwt.sign(
                {
                  user: user,
                },
                sails.config.custom.jwt.secret,
                sails.config.custom.jwt.options);
              let data = {
                user,
                token
              };
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
    // await promise.then((data)=>{
    //   return data;
    //   // eslint-disable-next-line handle-callback-err
    // }, (err)=>{
    //   throw {error: err};
    // });
    return promise;
  }


};

