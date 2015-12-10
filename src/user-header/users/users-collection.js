const User = require('./user')
const Collection = require('backbone').Collection

module.exports = Collection.extend({
  model: User,
  url: '/users',
  parse: data => data.data
})
