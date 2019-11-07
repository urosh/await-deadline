const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const awaitDeadline = require('../src/index.js');

chai.use(chaiAsPromised);
chai.should(); 

const intervals = [];
const functions = [];
const numberOfIntervals = 5;
const intervalStep = 2;
const intervalBase = 1000;
const params = [];
let funcTimeout;
for (let i = 1; i < numberOfIntervals + 1; i++) {
  intervals.push(intervalBase * i * intervalStep);
  params.push('param' + i);
  functions.push((...args) => {
    return new Promise((resolve) => {
      clearTimeout(funcTimeout);
      funcTimeout = setTimeout(() => {
        let response = '';
        args.map(arg => {
          response = response + arg.toString();
        })
        resolve(response);
      }, intervalBase * i);
    })
  })
}


describe('Await Limiter', async () => {

  afterEach(() => {
    clearTimeout(funcTimeout);
  })

  describe('Resolving the passed function', () => {
    it('Should successfuly resolve', async () => {
      const response = await awaitDeadline.run(intervals[3], functions[0], params[0], params[1]);
      expect(response).to.be.equal(params[0] + params[1]);
    });

    it('Should handle random number of parameters', async () => {
      const response = await awaitDeadline.run(intervals[3], functions[0], params[0], params[1], params[2]);
      expect(response).to.be.equal(params[0] + params[1] + params[2]);
    });

    it('Should handle function with no parameters', async () => {
      const response = await awaitDeadline.run(intervals[3], functions[0]);
      expect(response).to.be.equal('');
    });
  });

  describe('Trigger timeout', () => {
    it('Should timeout if the function takes long time', async() => {
      try {
        await awaitDeadline.run(intervals[1], functions[3], params[0], params[1]);
      } catch(err){
        expect(err).to.be.equal('Request timed out');
      }
    })
  })
  
  describe('Handle wrong inputs', () => {
    it('Should throw error if no function passed', async() => {
      try {
        await awaitDeadline.run(intervals[1], intervals[1], params[0], params[1]);
      } catch(err){
        expect(err).to.be.equal('No callback provided.');
      }
    })

    it('Should throw error if no function passed', async() => {
      try {
        await awaitDeadline.run(intervals[1], intervals[1], params[0], params[1]);
      } catch(err){
        expect(err).to.be.equal('No callback provided.');
      }
    })
  });
});



