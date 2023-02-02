/**
 * Title: utilite
 * Description: utilite function 
 * Author: Nazim
 * Date: 31/01/22
 * 
 */

// Dependencies


// Object Module Scaffolding
const utilite = {}

// string
utilite.parseJSON = ( stringJSON) => {
    let data = {};
    try{
        data = JSON.parse( typeof(stringJSON) == 'string' ? stringJSON : {})
    } catch ( err ){
        data = {}
    }
    return data;
}
// Export 
module.exports = utilite;
