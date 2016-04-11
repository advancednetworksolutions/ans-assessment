/**
 * Assessment model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Assessment = require('./assessment.model');
var AssessmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AssessmentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Assessment.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AssessmentEvents.emit(event + ':' + doc._id, doc);
    AssessmentEvents.emit(event, doc);
  }
}

module.exports = AssessmentEvents;
