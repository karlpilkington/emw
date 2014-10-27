
var modelEVSE = require('./models-evse');
var modelISO  = require('./models-iso');
var restify   = require('restify');

exports.powerOn = function(req, res, next) {
	modelEVSE.powerOn({
		id: req.params.evseID,
		model: req.params.evseModel,
		customer: req.params.customerID,
		lineVoltage: req.params.lineVoltage,
		status: req.params.status,
		location: req.params.location,
		accessURL: req.params.accessURL
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record powerOn data because '+ err));
		} else {
			res.send(200, {
				// send back some data including any additional authentication token
			});
			/*
			 * Alternate method of sending authentication token ..
			 
			 clientForEVSE(req.params.evseID, function(err, client) {
				if (err) {
					// where to send error?
				} else {
					client.post('/control/authWithControl', {
						// include here any authentication token we want etc
					}, function(err, reqpost, respost, objpost) {
						if (err) {
							// do something with err
						} else {
							// we'll just get back some positive indicator
							// nothing much to do with it
						}
					});
				}
			}); */
		}
	});
};

exports.powerOff = function(req, res, next) {
	modelEVSE.powerOff({
		id: req.params.evseID,
		customer: req.params.customerID,
		status: req.params.status,
		location: req.params.location
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record powerOff data because '+ err));
		} else {
			res.send(200, {
				// acknowledging ... 
			});
		}
	});
};

exports.plugIntoVehicle = function(req, res, next) {
	modelEVSE.plugIntoCar({
		id: req.params.evseID,
		model: req.params.evseModel,
		customer: req.params.customerID,
		lineVoltage: req.params.lineVoltage,
		status: req.params.status,
		location: req.params.location,
		evseMaxAmps: req.params.evseMaxAmps,
		carMaxAmps: req.params.carMaxAmps
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record plugIntoVehicle data because '+ err));
		} else {
			res.send(200, {
			});
			// If the network is under an ISO requested brownout we should send
			// notification to the EVSE to adjust its MaxAmps downwards
			modelISO.evseCoveredByReductionRequest(evse, function(err, reductionRequest) {
				if (!err && reductionRequest) {
					exports.sendReductionRequest(reductionRequest, evse);
				}
			});
		}
	});
};

exports.sendReductionRequest = function(reductionRequest, evse, done) {
	modelISO.addEVSEtoReductionRequest(reductionRequest, evse);
	
	clientForEVSE(evse.ID, function(err, client) {
		if (err) {
			done(err);
		} else {
			client.post('/control/setMaxAmps', {
				// auth token
				decrease: reductionRequest.decreasePerEVSE, // kW's to decrease
			}, function(err, reqpost, respost, objpost) {
				if (err) {
					// do something with err
				} else {
					// we'll just get back info about amount actually decreased
					// we need to count this up
					// we need to store that info via modelEVSE
					modelEVSE.adjustedMaxAmps({
						// info about the amount actually reduced
					}, function(err) {
						done(undefined, {
							// indicate data about the reduction amount
						});
					});
				}
			});
		}
	});
};

exports.heartBeat = function(req, res, next) {
	modelEVSE.heartBeat({
		id: req.params.evseID,
		model: req.params.evseModel,
		customer: req.params.customerID,
		lineVoltage: req.params.lineVoltage,
		status: req.params.status,
		location: req.params.location,
		evseMaxAmps: req.params.evseMaxAmps,
		carMaxAmps: req.params.carMaxAmps,
		currentAmps: req.params.currentAmps
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record heartBeat data because '+ err));
		} else {
			res.send(200, {
			});
		}
	});
};

/**
 * this function only needed if EVSE is going to be reporting this data
 * through a separate request.  But the EVSE is probably going to report
 * this data as the response to the /control/setMaxAmps message
 */
exports.adjustedMaxAmps = function(req, res, next) {
	modelEVSE.adjustedMaxAmps({
		id: req.params.evseID,
		model: req.params.evseModel,
		customer: req.params.customerID,
		lineVoltage: req.params.lineVoltage,
		status: req.params.status,
		newMaxAmps: req.params.newMaxAmps
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record adjustedMaxAmps data because '+ err));
		} else {
			res.send(200, {
			});
		}
	});
};

exports.unplugged = function(req, res, next) {
	modelEVSE.unplugged({
		id: req.params.evseID,
		model: req.params.evseModel,
		customer: req.params.customerID,
		status: req.params.status
	}, function(err, evse) {
		if (err) {
			res.send(500, new Error('Could not record unplugged data because '+ err));
		} else {
			res.send(200, {
			});
			modelISO.evseCoveredByReductionRequest(evse, function(err, reductionRequest) {
				if (!err && reductionRequest) {
					modelISO.removeEVSEfromReductionRequest(reductionRequest, evse);
				}
			});
		}
	});
};

exports.checkAuthToken = function(req, res, next) {
	// If we're sending an additional auth token to EVSE then this 
	// function is used to check it.  That's don in server.js by adding
	// this function to the list of handler functions
	if (auth token is bogus) {
		next(new Error('Authentication failed'));
	} else {
		next();
	}
};


var clientForEVSE = function(id, done) {
	modelEVSE.accessURL(id, function(err, accessURL) {
		if (err) done(err);
		else {
			var client = restify.createJsonClient({
				url: accessURL
			});
			// do any authentication with the evse
			done(undefined, client);
		}
	});
};