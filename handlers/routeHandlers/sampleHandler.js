/**
 * Title: Sample Handle
 * Description: Sample Handler 
 * Author: Nazim
 * Date: 28/11/22
 * 
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {

    // console.log(requestProperties);
    callback(200,{
        message:" this is sample page",
    });  
};

module.exports = handler;