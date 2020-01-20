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
   * User
   */
  'POST /login': 'user/login',
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
  'GET /admin/login': 'admin/view-login',

  /**
   * Api
   */
  'POST /api/login': 'api/user/login',


};
