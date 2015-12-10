var test = require('tape')
var View = require('./details-view')
const Person = require('../persons/person')

test('dummy test', function (t) {
  t.ok(true)
  t.end()
})

test('Person instance', function (t) {

  var person = new Person()

  t.ok(person instanceof Person)
  t.ok(person.attributes)
  t.ok(person.deals)

  t.equal(person.url(), '/persons')
  t.end()
})

test('activityRenderer method existance', function (t) {

  t.ok(View.prototype.activityRenderer)
  t.equal(typeof View.prototype.activityRenderer, 'function')
  t.equal(typeof View.prototype.activityRenderer(), 'function')

  t.end()

})

