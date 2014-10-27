Sample code for plausible server end support of a network of electric vehicle charging stations reacting to demand response signals from the ISO.

The implementation is in Node.js, and uses REST style interfaces implemented using the Restify framework.

The evse directory contains pseudo-code of a REST server running inside an EVSE.  It both sends events to a central server, and receives commands from that server.

The server directory is pseudo-code of a REST server for the network of participating EVSE's.  It receives events from the EVSE's and from the ISO, and dispatches commands to the EVSE's as appropriate.

## Server events

POST requests to `/evse` URL's are to come from the EVSE's, while POST requests from `/iso` come from the ISO.

EVSE's will send events to the server depending on events within the EVSE.  
You can see the configuration for those events in the `evse/index.js` script.
These events include `powerOn`, `powerOff`, `plugIntoVehicle`, and `unplugged`.
While the EVSE is connected to a vehicle, it will send a heartbeat every minute or so
containing data about the active charging session.

The ISO sends events to the server related to its business.

## Server data storage

The server maintains two data stores.

* EVSE's - Data about each connected EVSE, location, and its current status.
* ReductionRequest's - Each time the ISO sends a demand response request, it gets recorded, and then a list of affected EVSE's is recorded.

Additionally there should be an activity log necessary for various kinds of reporting.

