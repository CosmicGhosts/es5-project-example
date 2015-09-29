var lib = require('../../src').lib

describe('Library', function () {
  describe('#add', function () {
    it('adds the two arguments', function () {
      expect(lib.add(1, 2)).toEqual(3)
    })
  })
})
