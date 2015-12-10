const View = require('backbone').View

module.exports = View.extend({
  tagName: 'div',
  className: 'user-info',
  render(){
    if (!this.model || !this.model.isValid()) return this

    this.$el.html(`<div class="user-profile">
      <img src="${this.model.get('icon_url')}" />
        <div class="user-data">
          <div>${this.model.get('name')}</div>
          <div class="user-company">${this.model.get('email')}</div>
        </div>
      </div>`)
    return this
  }
})
