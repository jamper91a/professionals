/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': ['isAuthenticated'],


  /**
   * WEB
   */
  'customer/register/view-index': true,

  /**
   * Admin
   */
  'admin/*': ['isAuthenticated', 'isAdmin'],
  'admin/view-login': true,

  /**
   * Api
   */
  'api/*': ['isAuthenticated'],
  'api/user/login': true,
  'api/customer/*': ['isAuthenticated', 'isAdmin'],
  'api/customer/create': true,
  'api/professional/*': ['isAuthenticated', 'isAdmin'],
  'api/professional/create': true,
  // 'api/professional/list': true,
  'country/*': ['isAuthenticated', 'isAdmin'],
  'country/find': true,
};
