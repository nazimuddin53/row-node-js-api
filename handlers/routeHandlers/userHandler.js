/**
 * Title: User Handler
 * Description: User Handler for user create, deleate, get, update
 * Author: Nazim
 * Date: 31/01/2023
 * 
 */
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {

    // console.log(requestProperties);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf( requestProperties.method ) > -1){
        handler._users[ requestProperties.method](requestProperties, callback);
    }
    else{
        callback(405)
    }
};
// users  scaffolding
handler._users = {};

handler._users.get = (requestProperties, callback) => {
    callback(200,{
        message: 'user get method'
    })
}

handler._users.post = (requestProperties, callback) => {
    
}

handler._users.put = (requestProperties, callback) => {
    
}

handler._users.delete = (requestProperties, callback) => {
    
}
// export handler
module.exports = handler;