/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
// var cookieParser = require('cookie-parser');
module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),
    order: [
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    bodyParser: (function _configureBodyParser(){
      // var skipper = require('skipper');
      // var middlewareFn = skipper({ strict: true });
      // return middlewareFn;

      var skipper = require('skipper')();
      var rawParser = require("body-parser").raw({type: "*/*"});

      // Create and return the middleware function
      return function(req, res, next) {
        if (req.headers && req.headers['stripe-signature']) {
          // sails.log.info('request using raw parser middleware');
          return rawParser(req, res, next);
        }
        // Otherwise use Skipper to parse the body
        // sails.log.info('request using skipper middleware');
        return skipper(req, res, next);
      };
    })(),

  },

};
