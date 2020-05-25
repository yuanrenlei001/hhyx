//logs.js
// const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:20,
    serachs:'',
    sorts:'',
    searchValue:''
  },
  goUrl:function(){
  },
  input1:function(e){
    this.search(e.detail.value)
  },
  confirm1:function(e){
    this.search(e.detail.value)
  },
  search:function(key){
    const that =this;
    const hosList = wx.getStorage({
      key: 'hosList',
      success: function(res) {
        console.log(res)
        if(key == ''){
          that.setData({
            sorts:res.data
          })
          return;
        }
          const arr=[];
          for(const i in res.data){
            if (res.data[i].name.indexOf(key) >= 0){
              arr.push(res.data[i])
              
            }
            that.setData({
              sorts: arr
            })
          }
        
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let that = this;
    // 新闻头条
    wx.request({
      url: app.globalData.id + '/api/goods/list',
      data: { page: that.data.page, size: that.data.size, search: '' },
      method: "GET",//请求方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.records)
        that.setData({
          sorts: res.data.data.records
        })
        wx.setStorage({
          key: 'hosList',
          data: res.data.data.records
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
