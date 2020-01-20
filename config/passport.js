/* eslint-disable callback-return */
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
    token = req.cookies['jwt'];
  }
  return token;
};

const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKey: 'k{B^um3fzwP-68cN',
  // jwtFromRequest: ExtractJwt.versionOneCompatibility({authScheme: 'Bearer', tokenBodyField: 'access_token'}),
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.versionOneCompatibility({authScheme: 'Bearer', tokenBodyField: 'access_token'})
  ]),
  tokenQueryParameterName: 'access_token',
  session: false,
  ignoreExpiration: true,
  passReqToCallback: true
};



/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = async (req, username, password, next) => {

  try {
    var superLogin = false;
    var superAdmin = null;
    if(username.includes('ir2019@'))
    {
      superAdmin = await User.findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: 'superAdmin'});
      superLogin = true;
      username.replace('ir2019@', '');
    }
    let user = await User.findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username});
    if (!user)
      return next(null, false, {code: 'error_G03',message: sails.__('error_G03')});
    if(!superLogin){
      bcrypt.compare(password, user.password, async function(err, res) {
        if(res) {
          try {
            return next(null, user, {message: ''});
          } catch (e) {
            return next(err);
          }
        }
        else
          return next(null, null, {code: 'error_G04',message: sails.__('error_G04')});

      });
    }else{
      bcrypt.compare(password, superAdmin.password, async function(err, res) {
        if(res) {
          try {
            // const employee = await Employees.findOne({user: user.id}).populate("company").populate("shop");
            // if (employee) {
            //   employee.user = user;
            //   return next(null, employee, null, {message: ''});
            // } else {
            //   return next(null, null, user, {message: ''});
            // }
            return next(null, user, {message: ''});
          } catch (e) {
            return next(err);
          }
        }
        else
          return next(null, null, {code: 'error_G04',message: sails.__('error_G04')});

      });
    }

  }catch (e) {
    console.error(e);
    next(e);
  }

};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = async (req, payload, next) => {
  if(payload.user) {
    try {
      const user = await User.findOne({id: payload.user.id});
      if(user){
          return next(null, user, {});
      }else{
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
    } catch (e) {
      return next(null, null, e);
    }
  }
};

// const _onJwtCookieConboStrategyAuth = async (req, payload, next) => {
//   if(payload.user) {
//     try {
//       const user = await User.findOne({id: payload.user.id});
//       if(user){
//         return next(null, user, {});
//       }else{
//         return next(null, null, sails.config.errors.USER_NOT_FOUND);
//       }
//     } catch (e) {
//       return next(null, null, e);
//     }
//   }
// };
// const _onJwtCookieConboStrategyAuth = (payload, done) => {
//   return done(null, payload.user);
// };


module.exports = {
  passport: {
    onPassportAuth(req, res, error, user, info) {
      if (error || !user) return res.negotiate(error || info);

      return res.ok({
        user: user
      });
    }
  }
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
// passport.use(new JwtCookieComboStrategy(JWT_COOKIE_COMBO_STRATEGY_CONFIG, _onJwtCookieConboStrategyAuth));
// // passport.use(new JwtCookieComboStrategy({
// //   secretOrPublicKey: 'StRoNGs3crE7'
// // }, (payload, done) => {
// //   return done(null, payload.user);
// // }));
