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

  //'/': { view: 'pages/homepage' },


  /**
   * Customers
   */
  'POST /customer': 'customer/create',
  /**
   * Professionals
   */
  'POST professional': 'professional/create',

  /**
   * Admin Views
   */
  'GET /admin/index': 'admin/view-index',
  'GET /admin/login': {action: 'admin/view-login'},
  'POST /admin/login': {action: 'admin/view-login'},
  'GET /admin/customer/': {action: 'admin/customer/view-all'},

  /**
   * Api
   */
  'POST /api/login': 'api/user/login',
  'GET /api/customer/': 'api/customer/find',
  'POST /api/user/ban': 'api/user/ban',


};
