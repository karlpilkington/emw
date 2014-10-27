Sample code for plausible server end support of a network of electric vehicle charging stations reacting to demand response signals from the ISO.

The implementation is in Node.js, and uses REST style interfaces implemented using the Restify framework.

The evse directory contains pseudo-code of a REST server running inside an EVSE.  It both sends events to a central server, and receives commands from that server.

The server directory is pseudo-code of a REST server for the network of participating EVSE's.  It receives events from the EVSE's and from the ISO, and dispatches commands to the EVSE's as appropriate.

# Server events

POST requests to `/evse` URL's are to come from the EVSE's, while POST requests from `/iso` come from the ISO.

An EVSE when turned on sends a `/evse/powerOn` event to the server.