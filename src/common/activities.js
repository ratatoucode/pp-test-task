const Collection = require('backbone').Collection

module.exports = Collection.extend({
  url: '/activities',
  parse: data => data.data
})
