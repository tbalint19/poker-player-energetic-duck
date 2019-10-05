const sinon = require('sinon')
const Player = require('./Player.js')
const defaultGameState = require('./game-state.json')

const {getAmountToAllIn, getAmountToFold, getAmountToCall, getAmountToRaise} = require('./helpers.js');
const betMock = sinon.stub()

describe('helper methods', () => {
  test('should return 4000 for all in', () => {
    const result = getAmountToAllIn(defaultGameState);
    expect(result).toEqual(4000);
  });

  test('should return 0 for fold', () => {
    const result = getAmountToFold(defaultGameState);
    expect(result).toEqual(0);
  });

  test('should return 240 for call', () => {
    const result = getAmountToCall(defaultGameState);
    expect(result).toEqual(240);
  });

  test('should return 240 for amount to raise when raising NULL', () => {
    // effectively this is calling when sending 0
    const result = getAmountToRaise(defaultGameState);
    expect(result).toEqual(240);
  });

  test('should return 240 for amount to raise when raising with 0', () => {
    // effectively this is calling when sending 0
    const result = getAmountToRaise(defaultGameState, 0);
    expect(result).toEqual(240);
  });

  test('should return 340 for amount to raise when raising 100', () => {
    const result = getAmountToRaise(defaultGameState, 100);
    expect(result).toEqual(340);
  });
});
