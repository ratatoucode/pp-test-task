const Model = require('backbone').Model
const validator = require('./user-validation')

module.exports = Model.extend({
  validate: validator
})
