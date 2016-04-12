/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/assessments              ->  index
 * POST    /api/assessments              ->  create
 * GET     /api/assessments/:id          ->  show
 * PUT     /api/assessments/:id          ->  update
 * DELETE  /api/assessments/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Assessment = require('./assessment.model');
var request = require('request');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Assessments
exports.index = function(req, res) {
  Assessment.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Assessment from the DB
exports.show = function(req, res) {
  request({
    headers:{
      'X-Assessment-Token':req.get('X-Assessment-Token')
    },
    uri: "https://ansdev-ansolutionstest.cs24.force.com/services/apexrest/Readiness%20Assessments/"+req.params.id,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
    }, function(error, response, body) {
      if(response.body){
        res.send(response.body);
      }else{
        res.send('Disconnected from Salesforce');
      }
});
  /*Assessment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));*/
};

// Creates a new Assessment in the DB
exports.create = function(req, res) {
  Assessment.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Assessment in the DB
exports.update = function(req, res) {
  request({
    headers:{
      'X-Assessment-Token':req.get('X-Assessment-Token')
    },
    uri: "https://ansdev-ansolutionstest.cs24.force.com/services/apexrest/Readiness%20Assessments/"+req.params.id,
    method: "PUT",
    timeout: 10000,
    json:req.body,
    followRedirect: true,
    maxRedirects: 10
    }, function(error, response, body) {
      if(response.body){
        res.send(response.body);
      }else{
        res.send('Disconnected from Salesforce');
      }

});
};

// Deletes a Assessment from the DB
exports.destroy = function(req, res) {
  Assessment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
