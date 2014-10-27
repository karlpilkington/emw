
var modelEVSE = require('./models-evse');
var modelISO  = require('./models-iso');
var handlersEVSE = require('./handlers-evse');
var restify   = require('restify');
var async = require('async');

exports.connected = function(req, res, next) {
	// The ISO will be sending us some data - auth tokens or whatnot
	modelISO.connected({
		// send connection data
	}, function(err) {
		if (err) {
			next(err);
		} else {
			// send back positive response
			res.send(200, {
				//
			});
		}
	});
};

exports.returnToNormal = function(req, res, next) {
	modelISO.getReductionRequest({
		// data to identify the reductionRequest
	}, function(err, reductionRequest) {
		if (err) next(err);
		else {
			async.each(reductionRequest.affectedEVSEs(),
				function(evse, done) {
					var client = restify.createJsonClient({
						url: evse.accessURL
					});
				
					client.post('/control/returnToNormalAmps', {
						// nothing much to send, 
						// include auth token
					}, function(err, reqpost, respost, objpost) {
						if (err) {
							// do something with err
						} else {
							// we'll just get back some positive indicator
							// nothing much to do with it
						
							modelEVSE.returnToNormal({
								// evse ID etc
							}, function(err) {
								if (err) {
									done(err);
								} else {
									done();
								}
							});
						}
					});
				},
				function(err) {
					res.send(200, {
						// whatever response is necessary
					});
				});
		}
	});
};

exports.decrease = function(req, res, next) {
	
	modelISO.recordReductionRequest({
		// params describing locality affected - the req will have this info
	}, function(err, reductionRequest, reductionLocality) {
		modelEVSE.EVSElistForLocality({
			// locality identifier
		}, function(err, EVSElist) {
			if (err) next(err);
			else {
				// req will have indicator for amount of kW's to decrease
			
				// STEP 1 - filter EVSElist for EVSE's that can be decreased
				//    that is, EVSE's that are charging at their max
			
				var EVSElist2 = [];
				EVSElist.forEach(function (evse) {
					if (evse can be decreased) EVSElist2.push(evse);
				});
			
				// STEP 2 - divide kW's requested to decrease by number of EVSE's in list from STEP 1
			
				var decreasePerEVSE = req.params.kWDecreaseRequested / EVSElist2.length;
			
				// STEP 3 - go through the list from STEP 1, instructing each to decrease by N kw's
			
				async.each(EVSElist2,
					function(evse, done) {
						handlersEVSE.sendReductionRequest(reductionRequest, evse, function(err, data) {
							if (err) {
								done(err);
							} else {
								// we'll just get back info about amount actually decreased
								// we need to count this up
								done();
							}
						});
					},
					function(err) {
						// STEP 4 - inform ISO of amount of kW's actually decreased
						var client = restify.createJsonClient({
							url: modelISO.accessURL
						});
						client.post('/some/path/for/ISO', {
							// auth token
							// data needed to inform amount of actual decrease
						}, function(err, reqpost, respost, objpost) {
							if (err) {
								// do something with err
							} else {
								// what will we get back???
							}
						});
						
						// STEP 5 - respond to post request
						res.send(200, {
							// ??  Is this where we send the data mentioned in STEP 4 ???
						});
					});
			
			}
		});
	});
	
};

exports.authenticateISO = function(req, res, next) {
	// Every request from ISO will have to be authenticated
	// We check that here, and use this handler function in the handler chain
	
	if (auth token is bogus) {
		next(new Error('Authentication failed'));
	} else {
		next();
	}
};