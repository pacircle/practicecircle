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
    this.onShareQrCodeArticle()
    
  }

  onUnload(){
    this.hideQRcode()
  }
  

  onShareQrCodeArticle() {
    let appSetting = require('../../../src/project.config.json')
    let store:any = this.store
    let that=this;
    wx.request({
      url: 'https://wechatx.offerqueens.cn/user/sign?',
      data: {
        appId: appSetting.appid,
        openid: store.openid,
        type: 'arti'
      },
      method: 'POST',
      success:function(res){
        if(res.data.state == 200){
          console.log(res.data.file)
          //store.artiFile = res.data.file
          wx.getImageInfo({
            src: res.data.file,
            success: (res) => {
              // 下载成功 即可获取到本地路径
              console.log("下载成功",res.path)
              that.showQRcode('arti',res.path)
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

      /*
      const height=this.store.windowHeight;
      const width=this.store.windowWidth;


      //二维码
      const cx=(width-250)/2;//左上角C
      const cy=(height-250)/2-50+40;
      const cw=250;//宽高
      const ch=250;
      //整体的黄色
      const ax=15;//留出30的边-----左上角A
      const ay=50;//留出100的边
      const aw=width-30;
      const ah=height-100;
      //文字的左上角B
      const bx=cx;
      const by=cy-21-21-15-30;//两行18的字一行12的字刚好到二维码，留点余量好看一点
      //按钮的左上角
      const dx=cx;
      const dy=cy+250+50;
      this.setDataSmart({
        dx:dx,
        dy:dy,
      })
      const context = wx.createCanvasContext('QRcode',this)
      //外边框和底色
      context.rect(ax, ay, aw, ah)
      context.setFillStyle("rgb(255, 230, 0)")
      context.fill()
      //文字
      context.setFillStyle("black")
      context.setFontSize(25)
      if(type=="arti"){
        context.fillText('分享复盘,', bx, by, 250)
        context.fillText('获得阅读精华复盘权限', bx, by+30,250)
      }else if(type=="camp"){
        context.fillText('分享训练营,', bx, by, 250)
        context.fillText('获得训练营报名资格', bx, by+30,250)
      }
      context.setFontSize(25)
      context.fillText('(新用户扫码注册后才视为分享成功)', bx, by+60,250)
      
      context.drawImage(QRcodeFile,cx,cy,cw,ch)
      */
           

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
      context.fillText('分享复盘,', TextCx, TextCy1, 250)//二维码上面
      context.fillText('获得阅读精华复盘权限', TextCx, TextCy2,250)
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
