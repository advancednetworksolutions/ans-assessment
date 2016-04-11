'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var assessmentCtrlStub = {
  index: 'assessmentCtrl.index',
  show: 'assessmentCtrl.show',
  create: 'assessmentCtrl.create',
  update: 'assessmentCtrl.update',
  destroy: 'assessmentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var assessmentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './assessment.controller': assessmentCtrlStub
});

describe('Assessment API Router:', function() {

  it('should return an express router instance', function() {
    assessmentIndex.should.equal(routerStub);
  });

  describe('GET /api/assessments', function() {

    it('should route to assessment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'assessmentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/assessments/:id', function() {

    it('should route to assessment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'assessmentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/assessments', function() {

    it('should route to assessment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'assessmentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/assessments/:id', function() {

    it('should route to assessment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'assessmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/assessments/:id', function() {

    it('should route to assessment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'assessmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/assessments/:id', function() {

    it('should route to assessment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'assessmentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
