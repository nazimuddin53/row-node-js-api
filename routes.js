/**
 * Title: Routes
 * Description: Application Routes 
 * Author: Nazim
 * Date: 28/11/22
 * 
 */

// Dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

// Object Module Scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};

// Export 
module.exports = routes;
