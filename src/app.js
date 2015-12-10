const PersonList = require('./persons/person-list-view')
const history = require('backbone').history
const UserHeader = require('./user-header/user-header.view')

require('./router')
require('./util/ajax-config')()

const personList = new PersonList({
  el: '.left-sidebar .user-list'
})

const header = new UserHeader({
  el: 'header'
});

// Rendering initial components

//(function doWith(...components) {
//  return function (action) {
//    components.forEach(component => component[action]())
//  }
//})(header, personList)('render')

// Same as

((...components) => action => components.forEach(component => component[action]()))(header, personList)('render')

history.start()
