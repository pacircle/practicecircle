// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    value: '',
    articleInfos: [],
    orderInfo: "按时间顺序排序",
    visible: false,
    articleType: 'time',
    actions: [
      {
          name: '按时间顺序排序',
      },
      {
          name: '按阅读数量排序',
      },
      {
          name: '按评论数量排序'
      },
  ],
    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    //分享二维码------------


    windowHeight: 400,
    windowWidth: 300
    
  }

  async onLoad(options: any) {
    console.log(this.store)
    let store:any = this.store
    let that:any = this
    store.articleType = this.data.articleType
    // if (store.articleInfos.length === 0 ){//如果没有文章
      wx.request({
        url: "https://wechatx.offerqueens.cn/article/all",
        data: {
          openid: store.openid,
          articleType: store.articleType
        },
        method: 'POST',
        success:function(ress:any){
          console.log(ress.statusCode)
          if (ress.statusCode === 200){
              console.log(ress.data.articleInfos)
              store.articleInfos = ress.data.articleInfos
              that.setArticle(store.articleInfos)
          } else {
            wx.showToast({
              title: '获取文章失败，请检查网络',
              icon: 'none',
              duration: 2000
            })
          } 
          // console.log('微信 userInfo %o', res.userInfo)
        },
        fail:function(res){
          wx.showToast({
            title: '获取文章失败，请检查网络后重新启动小程序',
            icon: 'none',
            duration: 2000
          })
        }
      })
    // }
    /*
    //提供一个模版而已，后面要删掉的
    if(this.store.repInfos.length==0){
      this.store.repInfos.unshift({
        id: 0,
        nickName: '用户A',
        src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        time: "15分钟前",
        title: "2018年秋招腾讯产品经理面试复盘，已offer",
        sub: "20字的简要内容...",
        agree: 15,
        content: "500字的主要内容",
        commentList: [{
          id: '0',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        },{
          id: '1',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AB',
          time: '10分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      },{
        id: 1,
        nickName: '用户B',
        src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        time: "15分钟前",
        title: "2018年秋招腾讯产品经理面试复盘，已offer",
        sub: "20字的简要内容",
        content: "500字的主要内容",
        agree: 10,
        commentList: [{
          id: '0',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户BA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      })
    } */
  }
  async getArticle(type:String){
    let store:any = this.store;
    let that = this;
    store.articleType = type
    wx.request({
      url: "https://wechatx.offerqueens.cn/article/all",
      data: {
        openid: store.openid,
        articleType: store.articleType
      },
      method: 'POST',
      success:function(ress:any){
        console.log(ress.statusCode)
        if (ress.statusCode === 200){
            if (ress.data.articleInfos){
              console.log(ress.data.articleInfos)
              store.articleInfos = ress.data.articleInfos
              that.setArticle(store.articleInfos)
              wx.showToast({
                title: '更新列表成功',
                icon: 'none',
                duration: 1000
              })
            }         
        } else {
          wx.showToast({
            title: '更新列表失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        } 
        // console.log('微信 userInfo %o', res.userInfo)
      },
      fail:function(res){
        wx.showToast({
          title: '更新列表失败，请检查网络后重新启动小程序',
          icon: 'none',
          duration: 2000
        })
      }
    })  
  }
  async setArticle(articles: Array<JSON>){
    await this.setDataSmart({
      articleInfos: articles
    }) 
  }
  async onShow(){
    let store:any = this.store
    let that:any = this
    if (store.articleType){
      wx.request({
        url: "https://wechatx.offerqueens.cn/article/all",
        data: {
          openid: store.openid,
          articleType: store.articleType
        },
        method: 'POST',
        success:function(ress:any){
          console.log(ress.statusCode)
          if (ress.statusCode === 200){
              if (ress.data.articleInfos){
                console.log(ress.data.articleInfos)
                store.articleInfos = ress.data.articleInfos
                that.setArticle(store.articleInfos)
              }         
          } else {
            wx.showToast({
              title: '更新列表失败，请检查网络',
              icon: 'none',
              duration: 2000
            })
          } 
          // console.log('微信 userInfo %o', res.userInfo)
        },
        fail:function(res){
          wx.showToast({
            title: '更新列表失败，请检查网络后重新启动小程序',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.request({
        url: "https://wechatx.offerqueens.cn/article/all",
        data: {
          openid: store.openid,
          articleType: 'time'
        },
        method: 'POST',
        success:function(ress:any){
          console.log(ress.statusCode)
          if (ress.statusCode === 200){
              if (ress.data.articleInfos){
                console.log(ress.data.articleInfos)
                store.articleInfos = ress.data.articleInfos
                that.setArticle(store.articleInfos)
              }         
          } else {
            wx.showToast({
              title: '更新列表失败，请检查网络',
              icon: 'none',
              duration: 2000
            })
          } 
          // console.log('微信 userInfo %o', res.userInfo)
        },
        fail:function(res){
          wx.showToast({
            title: '更新列表失败，请检查网络后重新启动小程序',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    await this.setDataSmart({
      articleInfos: store.articleInfos
    })
  }

  toRepnew(){
    this.app.$url.repnew.go();
  }
  handleOpen() {
    this.setDataSmart({
        visible: true
    });
  }
  handleClickItem ({ detail }:any) {
    const index = detail.index + 1;
    if (index === 1){
      this.setDataSmart({
        visible: false,
      });
    }else if (index === 2){
      let type:String = 'agree'
      this.setDataSmart({
        visible: false,
        orderInfo: '按阅读数量排序',
        articleType: type
      });
      this.getArticle('agree')
    } else if (index === 3){
      let type:String = 'comment'
      this.setDataSmart({
        visible: false,
        orderInfo: '按评论数量排序',
        articleType: type
      });
      this.getArticle(type)
    }
  }
  handleCancel () {
    this.setDataSmart({
        visible: false
    });
  }
  clickDetail(e:any){
    console.log(e.target.dataset.info)
    // this.app.$url.repdetail.go({
    //   infos: JSON.parse(e.target.dataset.infos)
    // })
    let info = {
      ...e.target.dataset.info,
      content: encodeURIComponent(e.target.dataset.info.content),
      sub: encodeURIComponent(e.target.dataset.info.sub),
      avatarUrl: encodeURIComponent(e.target.dataset.info.avatarUrl),
      commentList: encodeURIComponent(e.target.dataset.info.commentList)
    }
    console.log(info)
    // let info = {
    //   agree: encodeURIComponent(e.target.dataset.info.agree),
    //   avatarUrl: encodeURIComponent(e.target.dataset.info.avatarUrl),
    //   commentList: encodeURIComponent(e.target.dataset.info.commentList),
    //   content: encodeURIComponent(e.target.dataset.info.content),
    //   elite: encodeURIComponent(e.target.dataset.info.elite),
    //   nickName: encodeURIComponent(e.target.dataset.info.nickName),
    //   readTime:  encodeURIComponent(e.target.dataset.info.readTime),
    //   sub: encodeURIComponent(e.target.dataset.info.sub),
    //   time: encodeURIComponent(e.target.dataset.info.time),
    //   title: encodeURIComponent(e.target.dataset.info.title),
    //   userId: encodeURIComponent(e.target.dataset.info.userId),
    //   user_agree: encodeURIComponent(e.target.dataset.info.user_agree),
    //   user_collect: encodeURIComponent(e.target.dataset.info._id)
    // }
    // let info = JSON.stringify(e.target.dataset.info);
    wx.navigateTo({
      url: '../repdetail/repdetail?info=' + JSON.stringify(info),
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

  handleInputFocus(e:any){
    console.log(e)
    wx.navigateTo({
      url: '../query/query',
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


  onShareAppMessage(res:any) {
    wx.showModal({
      title: '提示',
      content: '请点击下方“分享复盘”按键，获取个人分享码'
    })
    // let appSetting = require('../../../src/project.config.json')
    // let store:any = this.store
    // wx.request({
    //   url: 'https://wechatx.offerqueens.cn/user/sign?',
    //   data: {
    //     appId: appSetting.appid,
    //     openid: store.openid,
    //     type: 'arti'
    //   },
    //   method: 'POST',
    //   success:function(res){
    //     if(res.data.state == 200){
    //       console.log(res.data.file)
    //       store.artiFile = res.data.file
    //       wx.showToast({
    //         title: '分享复盘成功，获得阅读全部精华复盘权限',
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



  onShareQrCodeArticle(res:any) {
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
          /*wx.showToast({
            title: '分享复盘成功，获得阅读全部精华复盘权限',
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
    console.log('showQRCode')
    // 使用 wx.createContext 获取绘图上下文 context
    if(this.store.windowHeight&&this.store.windowWidth){
      this.setDataSmart({
        windowHeight: this.store.windowHeight,
        windowWidth: this.store.windowWidth
      })
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
        context.fillText('获得阅读精华复盘权限', bx, by+25,170)
      }else if(type=="camp"){
        context.fillText('分享训练营,', bx, by, 200)
        context.fillText('获得训练营报名资格', bx, by+25,170)
      }
      context.setFontSize(22)
      context.fillText('(新用户扫码注册后才视为分享成功)', bx, by+48,200)
      context.drawImage(QRcodeFile,cx,cy,cw,ch)
      const that=this;
      context.draw(false,function(){
        wx.canvasToTempFilePath({
          canvasId:"QRcode",
          success:res=>{
            console.log("canvas",res.tempFilePath)
            // that.data.QRcodeFilePath=res.tempFilePath
            that.setDataSmart({
              QRcodeFilePath: res.tempFilePath
            })
          },
          fail: res=> {
            console.log(res)
          }
        })
        
        
      })
    }else{
      console.log("没有窗口尺寸数据")
    }
  }
  saveQRcode(){
    console.log('saveQRCode',this.data.QRcodeFilePath)
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
