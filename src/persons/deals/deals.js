const Collection = require('backbone').Collection
const Deal = require('./deal')

module.exports = Collection.extend({
  model: Deal,
  parse: deals => deals.data && deals.data.filter(deal => deal.id) || []
})
