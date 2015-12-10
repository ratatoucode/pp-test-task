const Person = require('./person')
const Collection = require('backbone').Collection

module.exports = Collection.extend({
  model: Person,
  url: '/persons',
  parse: data => data.data
})
