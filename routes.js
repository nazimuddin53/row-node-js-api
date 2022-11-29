/**
 * Title: Routes
 * Description: Application Routes 
 * Author: Nazim
 * Date: 28/11/22
 * 
 */

// Dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');

// Object Module Scaffolding
const routes = {
    sample: sampleHandler,

};

// Export 
module.exports = routes;
