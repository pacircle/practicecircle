// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage,wxp } from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    camps: [],
    nowCamp: {},
    modalHidden: true,
    sign: false,
    signPower: false,

    modalHidden1: true,
    modalHidden2: true
  }
  async onLoad() {
    
  }
  async onShow() {
    // console.log(await wxp.getUserInfo())
    let store:any = this.store
    let that:any = this
    if (store.campMember >= 1){
      this.setDataSmart({
        signPower: true
      })
    }
    // let camps:any = this.data.camps
    wx.request({
      url:"https://wechatx.offerqueens.cn/camp/wechat/answer/all",
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

          /*let userList = res.data.data.camps[length -1].userList 
          if (userList.indexOf(store.openid) > -1){
            that.setDataSmart({
              sign: true
            })
            wx.navigateTo({
              url: '../campSuccess/campSuccess',
              success: function(res){
              },
              fail: function(res){
                wx.showModal({
                  title: '显示详情',
                  content: '页面跳转失败，请刷新页面后重试'
                })
              }
            })
          }*/
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

  modalConfirm1(){   
    this.setDataSmart({
      modalHidden1: true
    })
  }

  modalCandel1(){
    this.setDataSmart({
      modalHidden1: true
    })
  }

  modalConfirm2(){   
    this.setDataSmart({
      modalHidden2: true
    })
  }

  modalCandel2(){
    this.setDataSmart({
      modalHidden2: true
    })
  }

  getSignWay2(e:any){
    this.setDataSmart({
      modalHidden2: false
    })
  }

  getSignWay(){
    let store:any = this.store
    console.log(store.campMember)
    if (store.campMember < 1){
      this.setDataSmart({
        signPower: false
      })
      wx.showModal({
        title: '训练营报名方式',
        content: '1. 向管理员提供优质复盘获取报名资格\r\n2. 分享训练营获取报名资格'
      })
    } else {
      this.setDataSmart({
        modalHidden: false
      })
    }
  }

  
  onShareAppMessage(res:any) {
    wx.showModal({
      title: '提示',
      content: '请点击下方“分享训练营”按键，获取个人分享码'
    })
    // let appSetting = require('../../../src/project.config.json')
    // let store:any = this.store
    // wx.request({
    //   url: 'https://wechatx.offerqueens.cn/user/sign?',
    //   data: {
    //     appId: appSetting.appid,
    //     openid: store.openid,
    //     type: 'camp'
    //   },
    //   method: 'POST',
    //   success:function(res){
    //     if(res.data.state == 200){
    //       console.log(res.data.file)
    //       store.campFile = res.data.file
    //       wx.showToast({
    //         title: '分享训练营成功，获得训练营报名资格',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '用户登陆失败，无法获取个人分享码，请检查网络后重新启动小程序',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
    return {
        title: '交大分享圈-分享训练营',
        // imageUrl: require("../../images/practice.png"),
        imageUrl: 'https://wechatx.offerqueens.cn/weimage/practice1.png',   
        // wechat功能调整，无法返回是否分享成功
        // success: function(ress:any){
        //   console.log("转发成功", ress)
        // },
        // fail: function(resss:any){
        //   console.log("转发失败", resss)
        // }
    };
  }
  
  onShareQrCodeCamp1(e:any) {
    this.setDataSmart({
      modalHidden1: false
    })
  }

  toQRcodeCamp(){
    wxp.navigateTo({
      url: '../QRcodeCamp/QRcodeCamp',
    })
  }

  toCampSuccess(){
    wxp.navigateTo({
      url: '../campSuccess/campSuccess',
    })
  }
}
