App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
   
  },
  
  globalData: {
    userInfo: null,
    id: 'http://106.54.37.140',
    token: '',
    isLogin: false,
    nickName: ''
  },
  onShow: function (options) {
    
  },
  onHide: function() {
    console.log('App Hide')
  },
})