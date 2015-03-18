'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/motor', function() {

	this.timeout(15000);

  // it('should respond with JSON array', function(done) {
  //   request(app)
  //     .post('/api/motor/drive', {"direction" : "cw", "steps" : 128})
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       res.body.should.be.instanceof(Array);
  //       done();
  //     });
  // });
});