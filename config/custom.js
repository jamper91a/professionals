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
  //CHAT STATES
  CHAT_STATES: {
    CREATED: 6,
    STARTED: 7,
    FINISHED:8
  },
  //USER STATE ON CHAT
  CHAT_USER_STATE: {
    CONNECTED: 9,
    DISCONNECTED: 10
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
  },
  twilio:{
    service_id: 'IS0872b122d1d64804ab94877961b169ee'
  }
};
