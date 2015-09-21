var Promise = require('es6-promise').Promise
var selenium = require('selenium-standalone')

exports.install = function (opts) {
  return new Promise(function (resolve, reject) {
    selenium.install(opts, function (err) {
      if (err) { return reject(err) }
      return resolve()
    })
  })
}

exports.start = function (opts) {
  return new Promise(function (resolve, reject) {
    selenium.start(opts, function (err, child) {
      if (err) { return reject(err) }
      return resolve(child)
    })
  })
}
