/*
* Title: Uptime Monitoring Application
* Description: A RESTFul API to monitor up or down time of user difen link
* Author: Code Hp
* Date: 28/11/2020 
*
*/

// Dependencies 
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    // server listening port 
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
}

// handle Request Response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();