const View = require('backbone').View
const router = require('../router')

module.exports = View.extend({
  tagName: 'li',
  className: 'person-item',
  initialize(){

  },
  events: {
    'click .person-data': 'onClick'
  },
  onClick(){
    router.navigate(`details/${this.model.id}`, {trigger: true})
  },
  renderOrganization(model){
    return model.get('org_name') && `<div class="person-organization">${model.get('org_name')}</div>` || ``
  },
  render(){
    if (!this.model) return this

    this.$el.html(`<div class="person-data">
      <div class="person-name">${this.model.get('name')}</div>
      ${this.renderOrganization(this.model)}
    </div>`)

    this.$el.attr('id', this.model.id)

    return this
  }
})
