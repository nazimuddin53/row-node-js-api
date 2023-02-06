/**
 * Title: handler Request && Response
 * Description: Create for handling handling req and res
 * Auther: nazim
 * Date: 28/11/22
 */

// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');

const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const utilities = require('./utilities');


// Object - Module scaffolding 
const handle = {};

handle.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requestProperties.body = utilities.parseJSON(realData)
        // chosenHandler 
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
            payload = typeof (payload) === 'object' ? payload : {};

            // respos json 
            const payloadString = JSON.stringify(payload);

            // return the final response 
            res.setHeader('Content-type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
        });

        // response handel 

    })


}

// export handler

module.exports = handle;
