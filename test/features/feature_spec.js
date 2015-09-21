var globalBeforeAfter = require('./featureGlobal')

globalBeforeAfter({})

describe('Feature Home Page', function () {
  it('show the page title', function () {
    return this.browser
      .url('http://localhost:9000')
      .getTitle().then(function (title) {
        expect(title).toEqual('Home')
      })
      .end()
  })
})
