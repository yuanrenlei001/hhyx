
//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bnrUrl: [],
    indexNews:'',
    cInfo:'',
    listIndex:'',
    idxPage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.id)
    let that= this;
    // 首页轮播
    wx.request({
      url: app.globalData.id + '/api/banner/list',
      data: { token: app.globalData.token },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        // let arr = []
        // let obj ={}
        // for (var i = 0; i < res.data.data.length;i++){
        //   obj['url'] = res.data.data[i].img;
        //   arr.push(obj)
        // }
        that.setData({
          bnrUrl: res.data.data
        })
        console.log()
      }
    })
    // 新闻头条
    wx.request({
      url: app.globalData.id + '/api/radio/headline',
      data: { token: app.globalData.token },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          indexNews: res.data.data[0].content
        })
      }
    })
    // 分类
    wx.request({
      url: app.globalData.id + '/api/mallCategory/idxPage',
      data: { token: app.globalData.token },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          idxPage: res.data.data
        })
      }
    })
    // C位商品
    wx.request({
      url: app.globalData.id + '/api/goods/cInfo',
      data: { token: app.globalData.token },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let arr= []
        for(var i=0;i<res.data.data.length;i++){
          arr.push(res.data.data[i])
        }
        that.setData({
          cInfo:arr
        })
      }
    })
    // 首页商品列表
    wx.request({
      url: app.globalData.id + '/api/goods/listIdx',
      data: { token: app.globalData.token },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let arr = []
        for (var i = 0; i < res.data.data.records.length; i++) {
          arr.push(res.data.data.records[i])
        }
        that.setData({
          listIndex: arr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})


