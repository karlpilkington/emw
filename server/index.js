
var restify = require('restify');

var handlersEVSE = require('./lib/handlers-evse');
var handlersISO  = require('./lib/handlers-iso');

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// EVSE's ping this URL when they turn on and off. 
// powerOn will include a payload describing the EVSE
// powerOn should return some kind of token the EVSE can use for further communication

// PowerOn Payload
//     - EVSE id .. model ..
//     - Customer ID
//     - Line voltage
//     - Status (connected, ...?)
//     - Location - service territory?  GPS?

// PowerOn sends response to EVSE:/control/authWithControl
// PowerOff sends response to EVSE:/control/goodBye

server.post('/evse/powerOn', handlersEVSE.powerOn);
server.post('/evse/powerOff', handlersEVSE.powerOff);

// Sent by EVSE when it's plugged into a vehicle
// Payload that describes the vehicle and any other relevant data
//     - Line voltage
//     - Amperage requested by the car
//     - settings in EVSE for max amperage
//     - GPS coordinates?  Some kind of location within a service territory
//
// if powerOn results in additional auth token sent to EVSE then the
// auth token has to be checked.  This framework allows there to be multiple
// handler functions on these routes and therefore we would implement such a
// function and insert it into this chain of handlers

server.post('/evse/plugIntoVehicle', handlersEVSE.checkAuthToken, handlersEVSE.plugIntoVehicle);

// Sent by EVSE while its plugged in
// Payload would include current charge rate and similar data
//      - time stamp
//      - line voltage
//      - current amperage
//      - max amperage configured in EVSE
//      - amperage requested by car
//      - MaxAmps adjustment instruction from ISO
//         (null if this EVSE isn't adjusted)
//
// ditto.. check auth token on this handler

server.post('/evse/plugInHeartBeat', handlersEVSE.checkAuthToken, handlersEVSE.heartBeat);

// EVSE is responding to /control/setMaxAmps 
// The heartBeat will also convey this info
//
// ditto.. check auth token on this handler

server.post('/evse/adjustedMaxAmps', handlersEVSE.checkAuthToken, handlersEVSE.adjustedMaxAmps);

// EVSE was unplugged

server.post('/evse/unplugged', handlersEVSE.checkAuthToken, handlersEVSE.unplugged);

// We're connected to the ISO
// Payload will include relavent information for communication with ISO's protocol

server.post('/iso/connected', handlersISO.authenticateISO, handlersISO.connected);

// Message from ISO that EVSE's should return to normal

server.post('/iso/returnToNormal', handlersISO.authenticateISO, handlersISO.returnToNormal);

// Message from ISO that EVSE's can increase or decrease consumption
// Payload 
//       - ID of request
//       - service territory to affect
//       - kW to increase or decrease
//
// Our response back to ISO needs to indicate the amount of increase or decrease
//
// The 'increase' request is unlikely for us to satisfy it, and might not even
// be a request type sent by the ISO

// UNLIKELY TO BE NEEDED: server.post('/iso/increase', handlersISO.authenticateISO, ...);
server.post('/iso/decrease', handlersISO.authenticateISO, handlersISO.decrease);

