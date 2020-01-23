"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt',  (error, user, info) => {

    try {
      if(user) {
        req.user = user;
      }
      return next();
    } catch (e) {
      req.user = null;
    }
  })(req, res);
};