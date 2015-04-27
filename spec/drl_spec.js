import should from 'should';
import sinon from 'sinon';

var DRL = require('../src/drl');

describe('DRL', function(){
  it('is an object', function(){
    DRL.should.be.type('object');
  });
});