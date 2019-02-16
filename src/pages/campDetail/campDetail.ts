// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    campProp: {
      type: JSON,
      value: {
        answers: {
          type: Array,
          value: []
        },
        content: {
          type: String,
          value: ""
        },
        description: {
          type: String,
          value: ""
        },
        startTime: {
          type: String,
          value: ""
        },
        endTime: {
          type: String,
          value: ""
        },
        _id: {
          type: JSON,
          value: {
            $oid: ""
          }
        }
      }      
    },
    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    //分享二维码------------

    tabList: [
      {
        tag: "share",
        icon: "share",
        title: "分享"
      },
      {
        tag: "undo",
        icon: "undo",
        title: "返回"
      }
    ],
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info)) 
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
  }
  
  onShareAppMessage(res:any) {
    wx.showModal({
      title: '提示',
      content: '请点击下方“分享”按键，获取个人分享码'
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




  itemChange (e:any) {
    let key = e.currentTarget.dataset.key
    if (key === "share"){
      this.onShareQrCodeCamp()
    } else if (key === "undo"){
      this.app.$url.camp.go()
    } else  {
      this.app.$url.camp.go()
    }
  }


  onShareQrCodeCamp() {
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
      context.setFontSize(18)
      if(type=="arti"){
        context.fillText('分享复盘,', bx, by, 200)
        context.fillText('获得阅读精华复盘权限', bx+30, by+21,170)
      }else if(type=="camp"){
        context.fillText('分享训练营,', bx, by, 200)
        context.fillText('获得训练营报名资格', bx+30, by+21,170)
      }
      context.setFontSize(12)
      context.fillText('(新用户扫码注册后才视为分享成功)', bx, by+42,200)
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
