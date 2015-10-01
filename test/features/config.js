var isCI = !!process.env.CI

module.exports = {
  custom: { remoteSelenium: isCI },
  webdriverio: {
    remote: {
      desiredCapabilities: {
        browserName: 'phantomjs'
      }
    }
  }
}
