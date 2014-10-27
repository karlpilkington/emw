
var restify   = require('restify');


exports.authWithControl = function(req, res, next) {
	// We'll receive data from homebase
	// Presumably this includes an authentication token to use
	// need to save this data somewhere
};

exports.checkAuthentication = function(req, res, next) {
	// Used in route handlers to check the authentication
	if (auth token is bogus) {
		next(new Error('Authentication failed'));
	} else {
		next();
	}
};

exports.powerOff = function(params) {
	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/powerOff', {
		// ID and Auth Token
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// forget auth tokens etc
			// this happens during EVSE shutdown and therefore we might not have to do anything
		}
	});
};

exports.setMaxAmps = function(req, res, next) {
	// instruct the hardware to change it's MaxAmps
	
	res.send(200, {
		// indicate amps we went to
	});
	
	/**
	 * alternate method 
	 
	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/adjustedMaxAmps', {
		// ID and Auth Token
		// amount of kW's actually decreased
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
		}
	}); */
};

exports.returnToNormalAmps = function(req, res, next) {
	// instruct the hardware to remove imposed MaxAmps 
	
	res.send(200, {
		// indicate amps we went to
	});
	
	/*
	 * alternate method
	 
	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/adjustedMaxAmps', {
		// ID and Auth Token
		// amount of kW's it's now running at
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
		}
	}); */
};

exports.sendPowerOn = function() {

	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/powerOn', {
		// ID and Auth Token
		// other data as specified on the server
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
			
			// it may be that authentication tokens can be sent as
			// the response to this request ... in which case the authWithControl function is unnecessary
		}
	});
};

exports.plugIntoVehicle = function(params) {

	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/plugIntoVehicle', {
		// ID and Auth Token
		// other data as specified on the server
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
			
		}
	});
};

exports.sendHeartBeat = function(params) {

	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/plugInHeartBeat', {
		// ID and Auth Token
		// other data as specified on the server
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
			
		}
	});
};

exports.unplugged = function(params) {

	var client = restify.createJsonClient({
		url: controlServerAccessURL
	});
	
	client.post('/evse/unplugged', {
		// ID and Auth Token
		// other data as specified on the server
	},  function(err, reqpost, respost, objpost) {
		if (err) {
			// do something with err
		} else {
			// we'll just get back some positive indicator
			// nothing much to do with it
			
		}
	});
};



