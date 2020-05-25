const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: '',
    id:'',
    user: app.globalData.userInfo
  },
  bindGetUserInfo: function(e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.setData({
      id: app.globalData.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;

    if (that.data.isLogin !== true) {
      wx.getUserInfo({
        success(res) {
          that.setData({
            isLogin: true
          })
          wx.getStorage({
            key: 'login',
            success: function(res) {
              console.log(res)
              that.setData({
                user:res.data
              })
            },
          })
        },
        fail(res) {
          wx.setStorage({
            key: 'login',
            data: 0,
          })
          that.setData({
            isLogin: false
          })
        }
      })
    }
  },
  bindGetUserInfo: function(e) {
    const that = this;
    if (e.detail.userInfo) {
      console.log(that)
      that.setData({
        isLogin: true
      })
      let arr = e.detail.userInfo
      console.log(arr)
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            wx.request({
              url: that.data.id + '/api/user/login',
              data: {
                code: res.code,
                nickName: arr.nickName,
                avatar: arr.avatarUrl
              },
              method: "POST", //请求方法
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res.data.data)
                that.setData({
                  user: res.data.data
                })
                wx.setStorage({
                  key: 'login',
                  data: res.data.data,
                })
              }
              
            })
          } else {
            console.log('登录失败！' + res.errMsg)
            wx.setStorage({
              key: 'login',
              data: 2,
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})