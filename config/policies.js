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

  UserController: {
    'login': true
  },
  'customer/create': true,

  /**
   * Professionals
   */
  'professional/*': ['isAuthenticated', 'isAdmin'],
  'professional/create': true,
  'professional/list': true,

  /**
   * Country
   */
  'country/*': ['isAuthenticated', 'isAdmin'],
  'country/find': true,

  /**
   * Admin
   */
  'admin/*': ['isAuthenticated', 'isAdmin'],
  'admin/login': true

};
