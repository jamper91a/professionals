"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */


module.exports = (req, res, next) => {
  if(req.user.group === sails.config.custom.USER_ADMIN) return next();
  return res.forbidden();
};
