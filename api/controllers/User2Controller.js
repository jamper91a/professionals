/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {
  // login: function (req, res) {
  //   passport.authenticate('local', function (err, user, info) {
  //     if(!user){
  //       return res.notFound();
  //     }
  //     if (err) {
  //       return res.badRequest(info);
  //     }
  //
  //     if (user) {
  //       try {
  //         const token = jwt.sign(
  //           {
  //             user: user,
  //           },
  //           'k{B^um3fzwP-68cN');
  //         let data={
  //           user,
  //           token
  //         };
  //         // Send Set-Cookie header
  //         res.cookie('jwt', token, {
  //           httpOnly: true,
  //           sameSite: true,
  //           signed: true,
  //           secure: true
  //         });
  //
  //         // Return json web token
  //         return res.json(data);
  //       } catch (e) {
  //         return res.badRequest(e);
  //       }
  //
  //
  //     }
  //
  //     // req.login(user, {session: false}, (err) => {
  //     //   if (err) {
  //     //     res.badRequest(err);
  //     //   }
  //     //   if (user) {
  //     //     try {
  //     //       const token = jwt.sign(
  //     //         {
  //     //           user: user,
  //     //         },
  //     //         'k{B^um3fzwP-68cN');
  //     //       let data={
  //     //         user,
  //     //         token
  //     //       };
  //     //       return res.json(data);
  //     //     } catch (e) {
  //     //       let things={code: '', req:req, res:res, data:null, error:e};
  //     //       return res.badRequest(e);
  //     //     }
  //     //
  //     //
  //     //   }
  //     // });
  //
  //
  //   })(req, res);
  // },

};

