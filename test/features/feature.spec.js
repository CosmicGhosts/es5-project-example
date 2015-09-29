var harness = require('webdriverio-selenium-harness')
var config = require('./config')
var app = require('../../src').app
var harnessState = harness.setup(config)

describe('Feature Home Page', function () {
  before(function (done) {
    var self = this
    self.timeout(8000)
    return harnessState.then(function (state) {
      self.browser = state.browser
      app.listen(9000, done)
    })
  })

  after(function () {
    return harnessState.then(harness.teardown)
  })

  it('show the page title', function () {
    return this.browser
      .url('http://localhost:9000')
      .getTitle()
      .then(function (title) {
        expect(title).toEqual('Test Page')
      })
  })
})
