//logs.js
const util = require('../../utils/util.js')

Component({
  data: {
    logs: []
  },
    changeName() {
      wx.switchTab({
        url: '../user/money/money',
      })
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
