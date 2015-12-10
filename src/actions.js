var _ = require('underscore')
var Events = require('backbone').Events

var factory = {
  details(personId) {
    this.trigger('update', personId)
  }
}

_.extend(factory, Events)

module.exports = factory
