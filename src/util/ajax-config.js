const $ = require('jquery')
const config = require('../config').pipedrive
const path = require('path')

module.exports = function () {
  $.ajaxPrefilter(function (options) {
    options.url = [path.join(config.root_path, options.url), `?api_token=${config.api_key}`].join('')
    options.crossDomain = true

  })
}
