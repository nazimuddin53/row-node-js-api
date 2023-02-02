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
const environment = require('./helpers/environments');
const data = require('./lib/data');


// app object - module scaffolding
const app = {};


// testing file system
// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// });

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    // server listening port 
    server.listen(environment.port, () => {
        console.log(`listening env ${environment.envName} to port ${environment.port}`);
    });
}

// handle Request Response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();