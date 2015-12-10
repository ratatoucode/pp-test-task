const View = require('backbone').View

module.exports = View.extend({
  tagName: 'div',
  className: 'deal-list',
  initialize(options) {
    this.deals = options.deals
  },
  renderDeal(deal) {
    this.$el.find('.deals-table').append(`<div class="deal-row"><span class="deal-title">${deal.get('title')}</span><span>${deal.get('formatted_value')}</span></div>`)
  },
  render() {

    if (!this.deals.length) {
      this.$el.html('')
      return self
    }

    this.$el.html(`<h2>Deals</h2> <div class="deals-wrapper"><div class="deals-table"><div class="deal-header deal-row"><span>Title</span><span>Sum</span></div></div></div>`)
    this.deals.each(this.renderDeal.bind(this))
    return self
  }
})
