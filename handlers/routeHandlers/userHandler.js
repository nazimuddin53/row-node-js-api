/**
 * Title: User Handler
 * Description: User Handler for user create, deleate, get, update
 * Author: Nazim
 * Date: 31/01/2023
 * 
 */

// Dependenciy
const { hash, parseJSON } = require("../../helpers/utilities");
const data = require("../../lib/data")
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {

    // console.log(requestProperties);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    }
    else {
        callback(405)
    }
};
// users  scaffolding
handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName = typeof (requestProperties.body.firstName) === "string" && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof (requestProperties.body.tosAgreement) == 'boolean' ? requestProperties.body.tosAgreement : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that user doesn't already exit
        data.read('users', phone, (err1) => {
            if (err1) {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                }
                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created  successfully!'
                        })
                    }
                    else {
                        callback(500, {
                            error: 'Could not create user!'
                        })
                    }
                })
            }
            else {
                callback(500, {
                    error: 'There was an problem in server side!',

                });
            }
        });
    }
    else {
        callback(400, {
            message: 'you have a problem in your request',
            body: [firstName, lastName, phone, password, tosAgreement]
        })
    }
}

handler._users.get = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, data) => {
            const user = { ...parseJSON(data) };
            if (!err && user) {
                delete user.password;
                callback(200, user);
            }
            else {
                callback(404, {
                    message: 'Requested user was not found!'
                })
            }
        })
    }
    else {
        callback(404, {
            message: 'Requested user was not found!'
        })
    }

}



handler._users.put = (requestProperties, callback) => {
    const firstName = typeof (requestProperties.body.firstName) === "string" && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            // lookup user
            data.read('users', phone, (err1, uData) => {
                const userData = { ...parseJSON(uData) }
                if (!err1 && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = password;
                    }
                    // store to database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callback(200, {
                                message: "User was updated successfully!"
                            });
                        }
                        else {
                            callback(500, {
                                error: "There was a problem in server side"
                            })
                        }
                    })
                }
            });
        }
        else {

            callback(400, {
                error: 'you have a problem in your request!'
            })
        }
    }
    else {
        callback(400, {
            error: 'you have a problem in your request!'
        })
    }
}

handler._users.delete = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err1, userData) => {

            if (!err1 && userData) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was successfully deleteed!'
                        });
                    }
                    else {
                        callback(500, {
                            error: "There was a server side error!"
                        });
                    }
                });

            }
            else {
                callback(404, {
                    message: 'There was a server side error!'
                });
            }
        });
    }
    else {
        callback(404, {
            message: 'There was a problem in your request!'
        });
    }

}
// export handler
module.exports = handler;