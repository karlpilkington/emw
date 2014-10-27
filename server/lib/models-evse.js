
// There are two aspects of the data to record
//
// PER EVSE - keep track of its current status
// OVER TIME - we'll want a running log of data e.g. to create graphs for reporting

exports.config = function(params) {
	// Here we will be told 
	//     - where to store data
}

exports.powerOn = function(params, done) {
	// Here we will store EVSE params in a persistent storage (? REDIS ? DB ?)
	// Record in activity log that EVSE turned on
};


exports.powerOff = function(params, done) {
	// Here we will delete the EVSE params in a persistent storage (? REDIS ? DB ?)
	// Record in activity log that EVSE turned off
};

exports.plugIntoCar = function(params, done) {
	// Here we record in the data more info - this time about the car we're connected to
};

exports.heartBeat = function(params, done) {
	// Here we record the latest data from the EVSE
};

exports.adjustedMaxAmps = function(params, done) {
	// Here we record that the given EVSE adjusted its MaxAmps 
	// in response to ISO request
};

exports.returnToNormal = function(params, done) {
	// we've told the EVSE to return to normal operation
	// clear any flags from data store
};

exports.isUnderRequestedDecrease = function(id, done) {
	// look at data for given EVSE, informing whether it is running at reduced rate
};

exports.unplugged = function(params, done) {
	// clear data about plugged-in status
};

exports.EVSElistForLocality = function(params, done) {
	// generate an array of EVSE's for the given locality
	// localities are supplied during powerOn and plugIntoCar events
};

exports.accessURL = function(id, done) {
	// Retrieve from datastore the accessURL for the EVSE identified by ID
	done(undefined, accessURL);
};