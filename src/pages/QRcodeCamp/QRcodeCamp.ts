// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    dx:"",
    dy:"",
    QRcodeFilePath:"",
  }

  async onLoad(options: any) {
    this.onShareQrCodeCamp()
  }

  onUnload(){
    this.hideQRcode()
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
      

      //创建canvasContext
      const context = wx.createCanvasContext('QRcode',this)

      //获取窗口size，二维码图片的size是250*250
      const height=this.store.windowHeight*0.8;//留下20%给按钮
      const width=this.store.windowWidth;
      
      //以左上角坐标和长宽作图
      //画背景框
      const bgAx=10
      const bgAy=10
      const bgWidth=width-20
      const bgHeight=height-10
      context.rect(bgAx, bgAy, bgWidth, bgHeight)
      context.setFillStyle("rgb(255, 230, 0)")
      context.fill()

      //计算二维码占的比例，剩下的等分成上下两部分字就行
      const ratio=250/(bgHeight)
      const divided=(1-ratio)/2
      const fontSize=height*divided*0.4>20?20:height*divided*0.4
      //画二维码
      const QRcodeAx=(width-250)/2;//令二维码处于窗口水平正中间
      const QRcodeAy=height*divided+bgAy;//
      const QRcodeWidth=250
      const QRcodeHeight=250
      context.drawImage(QRcodeFile,QRcodeAx,QRcodeAy,QRcodeWidth,QRcodeHeight)
      //写字
      const TextCx=QRcodeAx
      const TextCy1=height*divided-10-fontSize
      const TextCy2=height*divided-5
      const TextCy3=QRcodeAy+20+fontSize+QRcodeHeight
      context.setFillStyle("black")
      context.setFontSize(fontSize)
      context.fillText('2019校招，', TextCx, TextCy1, 250)//二维码上面
      context.fillText('一起加入产品经理训练营', TextCx, TextCy2,250)
      context.fillText('(新用户扫码注册后才视为分享成功)', QRcodeAx, TextCy3,250)


      
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
    wx.previewImage({urls:[this.data.QRcodeFilePath]})
  }

  hideQRcode(){
    this.setDataSmart({
      QRcodeFilePath:"",
    })
  }
}
