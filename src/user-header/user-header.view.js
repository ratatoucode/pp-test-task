const View = require('backbone').View
const UserCollection = require('./users/users-collection')
const _ = require('underscore')
const UserView = require('./users/user-view')

module.exports = View.extend({
  model: new UserCollection(),
  tagName: 'div',
  initialize() {
    this.listenTo(this.model, 'add', this.onCollactionAdd)
  },
  onCollactionAdd(e, collection){
    collection.each(this.appendUser.bind(this))
  },
  appendUser(model){
    var userView = new UserView({model})
    this.$el.append(userView.render().$el)
  },
  render(){
    if (!this.model) return this

    this.model.fetch()
    this.$el.html(``)
    return this
  }
})
