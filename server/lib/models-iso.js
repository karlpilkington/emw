
exports.config = function(params) {
	// Here we will be told 
	//     - where to store data
}

exports.connected = function(params, done) {
	// Save connection data to a database
	if (error) {
		done(error);
	} else {
		done();
	}
};

exports.accessURL = function() {
	return the access URL;
};

exports.recordReductionRequest = function(params, done) {
	// Record the information about this reduction request
	// generate an id token
	if (errors) {
		done(error object);
	} else {
		done(undefined, ID, locality);
	}
};

exports.getReductionRequest = function(params, done) {
	// retrieve from data store the info for a given reductionRequest
	done(undefined, reductionRequest);
};

// NOTE: the reductionRequest object must have some functions
//
//    affectedEVSEs - returns array of EVSE's covered by the reductionRequest

exports.evseCoveredByReductionRequest = function(evse, done) {
	// indicate whether this EVSE is in an area with
	// an active demand reduction request
	if (yes) {
		done(undefined, reductionRequest);
	} else {
		done(undefined, undefined);
	}
};

exports.addEVSEtoReductionRequest = function(reductionRequest, evse) {
	// 
};

exports.removeEVSEfromReductionRequest = function(reductionRequest, evse) {
	// 
};
