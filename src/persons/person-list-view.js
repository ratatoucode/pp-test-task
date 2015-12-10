const View = require('backbone').View
const Persons = require('./persons')
const PersonItem = require('./person-view')
const actions = require('../actions')
const $ = require('jquery')
const ASQ = require('asynquence')

module.exports = View.extend({
  model: new Persons(),
  initialize() {
    this.listenTo(this.model, 'reset', this.onCollactionAdd)
    actions.on('update', this.setActive, this)
  },
  setActive(personId) {

    ASQ(personId)
      .then(done => {
        setTimeout(function () {
          done()
        }, 200)
      })
      .then(done => {
        this.removeAllActive().$el.find(`li#${personId}`).each(function (i, elem) {
          $(elem).addClass('active-person')
        })
        done()
      })

    return this
  },
  removeAllActive() {
    this.$el.find('li').each(function (i, elem) {
      $(elem).removeClass('active-person')
    })

    return this
  },
  onCollactionAdd(collection) {
    collection.each(this.appendUser.bind(this))
  },
  appendUser(model) {
    const item = new PersonItem({model})
    this.$el.append(item.render().$el)
  },
  render() {
    this.model.fetch({
      reset: true
    })
    return this
  }
})
