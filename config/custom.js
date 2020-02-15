/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  //Types of users
  USER_ADMIN: 1,
  USER_CUSTOMER: 2,
  USER_PROFESSIONAL: 3,
  //PROFESISONAL STATES
  PROFESSIONAL_STATES: {
    ONLINE: 1,
    OFFLINE: 2,
    JUST_CALLS:3,
    JUST_CHAT:4,
    BUSY: 5
  },

  jwt: {
    secret: 'k{B^um3fzwP-68cN',
    options: {
       audience: 'http://localhost:1337',
      expiresIn: '12h', // 1d
       // issuer: 'example.io'
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      // signed: true,
      // secure: true
    }
  }
};
