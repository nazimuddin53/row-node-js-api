/**
 * Title: utilite
 * Description: utilite function 
 * Author: Nazim
 * Date: 31/01/22
 * 
 */

// Dependencies
const crypto = require("crypto");
const environments = require("../helpers/environments");

// Object Module Scaffolding
const utilities = {}

// string
utilities.parseJSON = (stringJSON) => {
    let data = {};
    try {
        data = JSON.parse(stringJSON)
    } catch (err) {
        data = {}
    }
    return data;
}

// hash
utilities.hash = (str) => {
    try {
        if (typeof (str) === 'string' && str.length > 0) {
            let hash = crypto.createHmac('sha256', environments.secretKey)
                .update(str)
                .digest('hex');
            return hash;

        }
        else {
            return false;
        }
    } catch (err) {
        console.log('error in hash! ', err)

    }

}

// Export 
module.exports = utilities;
