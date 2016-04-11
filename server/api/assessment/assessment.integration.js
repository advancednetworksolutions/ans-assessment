'use strict';

var app = require('../..');
var request = require('supertest');

var newAssessment;

describe('Assessment API:', function() {

  describe('GET /api/assessments', function() {
    var assessments;

    beforeEach(function(done) {
      request(app)
        .get('/api/assessments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assessments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      assessments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/assessments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/assessments')
        .send({
          name: 'New Assessment',
          info: 'This is the brand new assessment!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAssessment = res.body;
          done();
        });
    });

    it('should respond with the newly created assessment', function() {
      newAssessment.name.should.equal('New Assessment');
      newAssessment.info.should.equal('This is the brand new assessment!!!');
    });

  });

  describe('GET /api/assessments/:id', function() {
    var assessment;

    beforeEach(function(done) {
      request(app)
        .get('/api/assessments/' + newAssessment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assessment = res.body;
          done();
        });
    });

    afterEach(function() {
      assessment = {};
    });

    it('should respond with the requested assessment', function() {
      assessment.name.should.equal('New Assessment');
      assessment.info.should.equal('This is the brand new assessment!!!');
    });

  });

  describe('PUT /api/assessments/:id', function() {
    var updatedAssessment

    beforeEach(function(done) {
      request(app)
        .put('/api/assessments/' + newAssessment._id)
        .send({
          name: 'Updated Assessment',
          info: 'This is the updated assessment!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAssessment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAssessment = {};
    });

    it('should respond with the updated assessment', function() {
      updatedAssessment.name.should.equal('Updated Assessment');
      updatedAssessment.info.should.equal('This is the updated assessment!!!');
    });

  });

  describe('DELETE /api/assessments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/assessments/' + newAssessment._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when assessment does not exist', function(done) {
      request(app)
        .delete('/api/assessments/' + newAssessment._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
