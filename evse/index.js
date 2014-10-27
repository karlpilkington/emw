
var restify = require('restify');
var handlersCentral = require('./lib/handlers-central');

var server = restify.createServer();

// Server responds to /evse/powerOn with some authentication
server.post('/control/authWithControl', handlersCentral.authWithControl);

// Server tells EVSE to change MaxAmps away from what it's currently running
// EVSE cannot change its Max above the amount configured by knobs on device
// EVSE will have to respond with the new MaxAmps
// Response to - /evse/adjustedMaxAmps

server.post('/control/setMaxAmps', handlersCentral.checkAuthentication, handlersCentral.setMaxAmps);

// Undoes instruction to modify MaxAmps
// MaxAmps will return to the setting indicated by knobs & negotiation with car
// Response to - /evse/adjustedMaxAmps

server.post('/control/returnToNormalAmps', handlersCentral.checkAuthentication, handlersCentral.returnToNormalAmps);

// Initiate the connection between EVSE and Central Control
handlersCentral.sendPowerOn();

// Some hardware event handlers are needed so we send commands to Central Control based on EVSE events

evse.on('plugIntoVehicle', function() {
	handlersCentral.plugIntoVehicle({
		// data
	});
});

evse.on('timerForHeartbeat', function() {
	handlersCentral.sendHeartBeat({
		// data
	});
};

evse.on('unplugged', function() {
	handlersCentral.unplugged({
		// data
	});
});

evse.on('poweringOff', function() {
	handlersCentral.powerOff({
		// data
	});
});