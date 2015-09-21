var webdriver = require('webdriverio')
var seleniumHelpers = require('./helpers/selenium')
var webdriverRemote = { desiredCapabilities: { browserName: 'phantomjs' } }
var selenium = seleniumSetup()

function seleniumSetup (installOpts, startOpts) {
  installOpts = installOpts || {}
  startOpts = startOpts || {}

  return seleniumHelpers
    .install(installOpts)
    .then(seleniumHelpers.start.bind(null, startOpts))
}

function isFunction (value) {
  return typeof value === 'function'
}

function handleFn (fn) {
  return new Promise(function (resolve, reject) {
    if (!isFunction(fn)) { return resolve(null) }

    var result = fn(function (err) {
      if (err) { return reject(err) }
      return resolve(null)
    })

    if (result && isFunction(result.then)) {
      return resolve(result)
    }
  })
}

function globalBeforeAfter (opts) {
  opts = opts || {}
  var remote = opts.remote || webdriverRemote
  var init = opts.init || {}
  var timeout = opts.timeout || 5000
  var browser = null

  before(function (done) {
    var self = this
    self.timeout(timeout)
    return selenium.then(function () {
      self.browser = browser = webdriver
        .remote(remote)
        .init(init)
        .then(handleFn(opts.before))
        .then(function () {
          done(null)
        })
        .catch(done)
    })
  })

  after(function (done) {
    return browser
      .end(function () {
        return selenium
          .then(function (childProcess) { childProcess.kill() })
      })
      .then(handleFn(opts.after))
      .then(function () { done(null) })
      .catch(done)
  })
}

module.exports = globalBeforeAfter
