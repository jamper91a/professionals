/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req, res) {
      res.sendfile(sails.config.appPath + '/assets/foo/index.html');
    },
  login: function (req, res) {
    res.sendfile(sails.config.appPath + '/assets/admin/login.html');
  }
};

