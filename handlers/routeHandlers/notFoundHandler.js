/**
 * Title: NotFoundHandle
 * Description: 404 Not Found Handler
 * Author: Nazim
 * Date: 28/11/22
 * 
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {

    // console.log(" Proerties: "+requestProperties);
    callback(404,{
        message:" Your requested URL was not found!",
    });  
};

module.exports = handler;