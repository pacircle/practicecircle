// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage } from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    camps: [],
    nowCamp: {},
    modalHidden: true,
    sign: false,
    signPower: false,

    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    modalHidden1:true,
    //分享二维码------------

    modalHidden2: true
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    let store:any = this.store
    let that:any = this
    if (store.campMemer >= 2){
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
          let userList = res.data.data.camps[length -1].userList 
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
          }
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
        imageUrl: require("../../images/practice.png"),
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

  onShareQrCodeCamp(res:any) {
    let appSetting = require('../../../src/project.config.json')
    let store:any = this.store
    let that=this;
    wx.request({
      url: 'https://wechatx.offerqueens.cn/user/sign?',
      data: {
        appId: appSetting.appid,
        openid: store.openid,
        type: 'camp'
      },
      method: 'POST',
      success:function(res){
        if(res.data.state == 200){
          console.log(res.data.file)
          //store.campFile = res.data.file
          wx.getImageInfo({
            src: res.data.file,
            success: (res) => {
              // 下载成功 即可获取到本地路径
              console.log("下载成功",res.path)
              that.showQRcode('camp',res.path)
            }
          })
          
          /*wx.showToast({
            title: '分享训练营成功，获得训练营报名资格',
            icon: 'none',
            duration: 2000
          })*/
        }
      },
      fail: function(res){
        wx.showToast({
          title: '用户登陆失败，无法获取个人分享码，请检查网络后重新启动小程序',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  showQRcode(type:string,QRcodeFile:any){
    // 使用 wx.createContext 获取绘图上下文 context
    if(this.store.windowHeight&&this.store.windowWidth){
      const height=this.store.windowHeight;
      const width=this.store.windowWidth;
      //二维码
      const cx=(width-200)/2;//左上角C
      const cy=(height-200)/2-50;
      const cw=200;//宽高
      const ch=200;
      //整体的黄色
      const ax=cx-30;//留出30的边-----左上角A
      const ay=cy-100;//留出100的边
      const aw=200+60;
      const ah=100+200+30;
      //文字的左上角B
      const bx=cx;
      const by=cy-21-21-15;//两行18的字一行12的字刚好到二维码，留点余量好看一点
      //按钮的左上角
      const dx=cx-15;
      const dy=cy+200+50;
      this.setDataSmart({
        dx:dx,
        dy:dy,
        shown:true
      })
      const context = wx.createCanvasContext('QRcode',this)
      //外边框和底色
      context.rect(ax, ay, aw, ah)
      context.setFillStyle("rgb(255, 230, 0)")
      context.fill()
      //文字
      context.setFillStyle("black")
      context.setFontSize(22)
      if(type=="arti"){
        context.fillText('分享复盘,', bx, by, 200)
        context.fillText('获得阅读精华复盘权限', bx, by+25,200)
      }else if(type=="camp"){
        context.fillText('分享训练营,', bx, by, 200)
        context.fillText('获得训练营报名资格', bx, by+25,200)
      }
      context.setFontSize(22)
      context.fillText('(新用户扫码注册后才视为分享成功)', bx, by+48,200)
      context.drawImage(QRcodeFile,cx,cy,cw,ch)
      const that=this;
      context.draw(false,function(){
        wx.canvasToTempFilePath({
          canvasId:"QRcode",
          success:res=>{
            console.log(res.tempFilePath)
            that.data.QRcodeFilePath=res.tempFilePath
          },
          fail: res => {
            console.log(res)
          }
        })
        
        
      })
    }else{
      console.log("没有窗口尺寸数据")
    }
  }

  saveQRcode(){
    console.log(this.data.QRcodeFilePath)
    wx.previewImage({urls:[this.data.QRcodeFilePath]})
    this.setDataSmart({
      shown:false,
      QRcodeFilePath:"",
    })
  }

  hideQRcode(){
    this.setDataSmart({
      shown:false,
      QRcodeFilePath:"",
    })
  }
  
}
