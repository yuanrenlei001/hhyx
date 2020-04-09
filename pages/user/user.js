//logs.js
const util = require('../../utils/util.js')

Component({
  data: {
    logs: []
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  }
})
