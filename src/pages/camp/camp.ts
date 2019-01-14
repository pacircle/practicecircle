// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage } from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    camps: [],
    nowCamp: {},
    modalHidden: true
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    let store:any = this.store
    let that:any = this
    // let camps:any = this.data.camps
    wx.request({
      url:"http://127.0.0.1:7979/camp/wechat/answer/all",
      method: "POST",
      data:  {
        openid: store.openid,
      },
      success: function(res){
        if (res.data.state === 200){
          console.log(res.data.data.camps)
          let length = res.data.data.camps.length
          that.setDataSmart({
            camps: res.data.data.camps.slice(0,length -1),
            nowCamp: res.data.data.camps[length -1]
          })
        } else {
          wx.showToast({
            title: '获取训练营信息失败，请检查网络',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail:function(ress){
        wx.showToast({
          title: '获取训练营信息失败，请检查网络',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }


  clickDetail(e:any){
    console.log(e.target.dataset.info)
    // this.app.$url.repdetail.go({
    //   infos: JSON.parse(e.target.dataset.infos)
    // })
    wx.navigateTo({
      url: '../campDetail/campDetail?info=' + JSON.stringify(e.target.dataset.info),
      success: function(res){
      },
      fail: function(res){
        wx.showModal({
          title: '显示详情',
          content: '页面跳转失败，请刷新页面后重试'
        })
      }
    })
  }


  modalConfirm(){
    this.setDataSmart({
      modalHidden: true
    })
  }

  modalCandel(){
    this.setDataSmart({
      modalHidden: true
    })
  }

  getSignWay(){
    this.setDataSmart({
      modalHidden: false
    })
  }
}
