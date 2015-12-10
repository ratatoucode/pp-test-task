const Router = require('backbone').Router
const DetailsView = require('./item-details/details-view')

const AppRouter = Router.extend({
  routes: {
    'details/:personId': 'viewDetails'
  },
  viewDetails(personId){
    const details = new DetailsView({
      el: '.main-container .profile-details',
      personId
    })
    details.render()
  }
})

module.exports = new AppRouter()
