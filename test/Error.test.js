//
// Unittest for the Game class
//
const chai = require('chai')
const assert = require('assert')
const Error = require('../src/models/apierror.model')

chai.should()

describe('Error', () => {

    it('should be intitialized successfully when providing valid arguments', (done) => {
        const error = new Error('abc', '1111')

        error.should.have.property('message').that.is.a('string').which.equals('abc')
        error.should.have.property('code').that.is.a('string').which.equals('1111')
        error.should.have.property('date')
        error.message.should.be.a('string')
        error.code.should.be.a('string')

        assert.equal(error.message, 'abc', 'Messages do not match')

        done()
    })

})
