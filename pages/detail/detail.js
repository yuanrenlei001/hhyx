let common = require('../Common/common.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    detail:'',
    id:'',
    isLogin: true
  },
  Shopping: function () {
    wx.getSetting({
      success(res){
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
          },
          fail:function(res){
            console.log(res)
          }
        })
      },
      fail(res){console.log(res)}
    })
  
  },
  bindGetUserInfo:function(e){
    const that = this;
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      isLogin: app.globalData.isLogin
    })
  },
 
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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
    console.log(app.globalData.userInfo)
    let that = this;
    // 详情
    wx.request({
      url: app.globalData.id + '/api/goods/findDetails',
      data: { token: app.globalData.token, goodsId:that.data.id},
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       console.log()
       that.setData({
         detail: res.data.data
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