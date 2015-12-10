const _ = require('underscore')
const Model = require('backbone').Model
const Deals = require('./deals/deals')

module.exports = Model.extend({
  initialize() {
    this.deals = new Deals()
    this.deals.url = `${this.urlRoot}/${this.id}/deals`
    this.deals.on('reset', _.noop)
  },
  urlRoot: '/persons'
})
