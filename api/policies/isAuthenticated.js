"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt',  (error, user, info) => {

    try {
      if (info.name === 'TokenExpiredError') info.status = 401;
      if (info.name === 'JsonWebTokenError') info.status = 401;
      if(info.message === 'No auth token') info.status = 401;

      if (req.wantsJSON) {
        if(info.status)
          return res.sendStatus(info.status);
        if (error || !user) return res.serverError(error || info);
      }else{
        if(info.status)
          return res.redirect('/admin/login');
        if (error || !user)
          return res.serverError(error || info);
      }

      req.user = user;

      return next();
    } catch (e) {
      res.serverError(e);
      if (req.wantsJSON) {
        return res.sendStatus(401);
      }
      // otherwise if this is an HTML-wanting browser, do a redirect.
      return res.redirect('/adm/login');
    }
  })(req, res);
};
