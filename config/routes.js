/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'view-home',

  /**
   * WEB
   */

  'GET /register': 'customer/register/view-index',
  'POST /register': 'customer/register/view-index',
  'GET /user/logout': 'user/logout',
  'GET /user/login': 'user/view-login',
  'POST /user/login': 'user/view-login',
  'GET /customer/historic': 'customer/view-historic',

  /**
   * Admin Views
   */
  'GET /admin/': 'admin/view-index',
  'GET /admin/index': 'admin/view-index',
  'GET /admin/login': 'admin/view-login',
  'POST /admin/login': 'admin/view-login',
  'GET /admin/customer/': 'admin/customer/view-all',
  'GET /admin/professional/': 'admin/professional/view-all',
  /**
   * Api
   */
  'POST /api/login': 'api/user/login',
  'GET /api/customer/': 'api/customer/find',
  'POST /api/user/ban': 'api/user/ban',
  'POST /api/user/remove': 'api/user/remove',
  'POST /api/customer': 'customer/create',
  'POST /api/professional': 'professional/create',

  /**
   * Partial Views
   */
  'PATCH /pv/admin/customer/customer-table': {action: 'admin/partial-view/customer/view-all/customer-table'},
  'PATCH /pv/admin/professional/professional-table': {action: 'admin/partial-view/professional/view-all/professional-table'},

};
