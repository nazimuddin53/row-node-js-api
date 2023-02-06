/**
 * Title: Token Handle
 * Description: Handler handle to token related route
 * Author: Nazim
 * Date: 28/11/22
 * 
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {

    // console.log(requestProperties);
    callback(200, {
        message: " this is sample page",
    });
}

// export handler
module.exports = handler;