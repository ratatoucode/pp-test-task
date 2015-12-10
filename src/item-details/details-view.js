const View = require('backbone').View
const Person = require('../persons/person')
const actions = require('../actions')
const DealsList = require('./deals/deal-list-view')
const _ = require('underscore')
const Activities = require('../common/activities')
const ASQ = require('asynquence')
const moment = require('moment')

module.exports = View.extend({
  tagName: 'div',
  className: 'item-details',
  activities: new Activities(),
  initialize(options) {

    const id = options.personId,
      self = this

    if (!id) return

    const person = new Person({id})


    ASQ(done => {
      this.activities.fetch({
        success: done
      })
    }).then(done => {
      person.fetch({
        success: self.render.bind(self)
      })
    })


  },
  getFirstValue(data){
    return _.first(data)['value']
  },
  activityRenderer(field){
    return model => {

      const id = model.get('data')[`${field}_activity_id`],
        date = model.get('data')[`${field}_activity_date`],
        time = model.get('data')[`${field}_activity_time`]

      const activitySubj = id && this.activities.find(activity => {
          return activity.get('id') === id
        }).get('subject')

      //${moment(date).format('LL')}

      return id && `${activitySubj},
        ${moment(date).fromNow()}
        ${time && ' ' + moment(time, 'HH:mm:ss').format('HH:mm') || ''}` || ``
    }
  },
  renderInnerData(model){

    return `<ul class="inner-data">
      <li><span class="inner-data-title">Phone</span><span>${this.getFirstValue(model.get('data').phone)}</span></li>
      <li><span class="inner-data-title">E-mail</span><span>${this.getFirstValue(model.get('data').email)}</span></li>
      <li><span class="inner-data-title">Added</span><span>${moment(model.get('data')['add_time']).format('LL')}</span></li>
      <li><span class="inner-data-title">Open deals</span><span>${model.get('data')['open_deals_count']}</span></li>
      <li><span class="inner-data-title">Next activity</span><span>${this.activityRenderer('next')(model)}</span></li>
      <li><span class="inner-data-title">Last activity</span><span>${this.activityRenderer('last')(model)}</span></li>
    </ul>`
  },
  render(model) {

    if (!model) return this
    const self = this

    model.deals.fetch({
      reset: true,
      success: dealsCollection => {
        var dealsList = new DealsList({
          el: '.main-container .profile-deals',
          deals: dealsCollection
        })

        dealsList.render()

      }
    })

    self.$el.html(`<h2>${model.get('data').name}</h2> ${this.renderInnerData(model)}`)

    actions.details(model.id)
    return self
  }
})
