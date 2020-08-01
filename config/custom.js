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
    ACCEPTED: 18,
    STARTED: 7,
    FINISHED:8,
    FINISHED_BY_CUSTOMER: 11,
    FINISHED_BY_PROFESSIONAL: 12,
    FINISHED_BY_ADMIN: 13,
    FINISHED_BY_OVERTIME: 14,
    FINISHED_BY_NO_ANSWER: 15,
    DECLINED_BY_PROFESSIONAL: 16,
    DECLINED_BY_CUSTOMER: 19,
    FINISHED_BEFORE_START: 17,
    LOST_CONNECTION_CUSTOMER: 20,
    LOST_CONNECTION_PROFESSIONAL: 21,
  },
  //USER STATE ON CHAT
  CHAT_USER_STATE: {
    CONNECTED: 9,
    DISCONNECTED: 10
  },
  //SOCKET EVETS
  SOCKET_EVENTS: {
    NEW_CHAT_INCOME: 'newChat',
    READER_CHANGE_STATUS: 'changeStatus',
    NEW_MESSAGE: 'newMessage',
    USER_CONNECTED_CHAT: 'userConnectedChat',
    CHAT_FINISHED: 'chatFinished',
    CHAT_CANCELED: 'chatCanceled',
  },
  //GATEWAYS
  GATEWAYS: {
    STRIPE: 'STRIPE',
    PAYPAL: 'PAYPAL'
  },

  PAYMENT_URL: {
    SUCCESS: '/success',
    FAIL: '/fail'
  },

  PAYMENT_STATE: {
    CREATED: 'CREATED',
    PROCESSING: 'PROCESSING',
    FINISHED: 'FINISHED',
    DENIED: 'DENIED'
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
  },

  STRIPE: {
    PUBLIC: 'pk_test_jL5O5x8MhXW1TJuhoNxY3TLu00VhZo5Awb',
    SECRET: 'sk_test_KS4T2V877VxTDEYryoB0Zjmo00DDNyID7g',
    WEBHOOKS:{
      SIGNATURE: 'whsec_BF1VDRnAZUmLXCrewWPEiGuPt24YOy3n'
    }
  }
};
