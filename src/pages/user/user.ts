// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    avatar: '',
    nickName: '',
    current: "history",

    hisInfos: [],
    //topic: [],
    //comment: [],
    collect: [],
    inviteMember: 0,
    campMember: 0,


    //分享二维码------------
    dx:"",
    dy:"",
    QRcodeFilePath:"",
    shown:false,
    //分享二维码------------

    //关闭强制分享
    showShare: false,
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    let store:any = this.store
    if (this.data.avatar.length === 0 && this.store.userInfo){
      this.setDataSmart({
        avatar: this.store.userInfo.avatarUrl,
        nickName: this.store.userInfo.nickName,
        inviteMember: store.inviteMember,
        campMember: store.campMember
      })
    }
    let that:any = this
    that.getHistory()
    //get相关内容
    // console.log(this.store.openid)
    // // let store:any = this.store;
    // await wx.request({
    //   url:"http://127.0.0.1:7979/user/read",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       store.hisInfos = res.data.readList
    //     } else {
    //       wx.showToast({
    //         title: '获取阅读历史失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '获取阅读历史失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })

    // await wx.request({
    //   url:"http://127.0.0.1:7979/user/article",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       store.myArticles = res.data.articleList
    //     } else {
    //       wx.showToast({
    //         title: '获取我的文章失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '获取我的文章失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })

    // await wx.request({
    //   url:"http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/comment",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.status === 200){
    //       store.myComments = res.data.commentList
    //     } else {
    //       wx.showToast({
    //         title: '获取我的评论失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     wx.showToast({
    //       title: '获取我的评论失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })

    // await wx.request({
    //   url:"http://127.0.0.1:7979/user/collect",
    //   data: {
    //     openid: store.openid
    //   },
    //   method:'POST',
    //   success: function(res){
    //     console.log("status:",res)
    //     if (res.data.state === 200){
    //       store.collectInfos = res.data.collectList
    //     } else {
    //       wx.showToast({
    //         title: '获取我的收藏失败，请检查网络',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res){
    //     console.log("status:",res.data.status)
    //     wx.showToast({
    //       title: '获取我的收藏失败，请检查网络',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })

  }

  handleChange (e:any) {
    let that:any = this
    this.setDataSmart({
        current: e.detail.key
    });
    console.log("switch to tag: ",this.data.current)
    let current = this.data.current
    if (current == "history"){
      that.getHistory()
    } else if (current == "topic"){
      that.getArticle()
    } else if (current == "collect"){
      that.getCollect()
    }
  }


  clickDetail(e:any){
    let commentList = e.currentTarget.dataset.info.commentList
    let commentListCode = []
    for (let i =0;i<commentList.length;i++){
      let item = commentList[i]
      let codeItem = {
        articleId: item.articleId,
        avatarUrl: encodeURIComponent(item.avatarUrl),
        content: encodeURIComponent(item.content),
        time: item.time,
        userId: item.userId,
        _id: item._id
      }
      commentListCode.push(codeItem)
    }
    let info = {
      ...e.currentTarget.dataset.info,
      content: encodeURIComponent(e.currentTarget.dataset.info.content),
      sub: encodeURIComponent(e.currentTarget.dataset.info.sub),
      avatarUrl: encodeURIComponent(e.currentTarget.dataset.info.avatarUrl),
      commentList: commentListCode
    }
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


  async getHistory(){
    console.log(this.store.openid)
    let store:any = this.store;
    let that:any = this
    await wx.request({
      url:"https://wechatx.offerqueens.cn/user/read",
      // url:"http://127.0.0.1:7979/user/read",
      data: {
        openid: store.openid
      },
      method:'POST',
      success: function(res){
        console.log("status:",res)
        if (res.data.state === 200){
          // store.hisInfos = res.data.readList
          let newArticleInfos = that.changeArticleSub(res.data.readList)
          store.hisInfos = newArticleInfos
        } else {
          wx.showToast({
            title: '获取阅读历史失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取阅读历史失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  async getArticle(){
    let store:any = this.store
    let that:any = this
    await wx.request({
      url:"https://wechatx.offerqueens.cn/user/article",
      // url:"http://127.0.0.1:7979/user/article",
      data: {
        openid: store.openid
      },
      method:'POST',
      success: function(res){
        console.log("status:",res)
        if (res.data.state === 200){
          // store.myArticles = res.data.articleList
          let newArticleInfos = that.changeArticleSub(res.data.articleList)
          store.myArticles = newArticleInfos
        } else {
          wx.showToast({
            title: '获取我的文章失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取我的文章失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  async getCollect(){
    let store:any = this.store
    let that:any = this
    await wx.request({
      // url:"http://127.0.0.1:7979/user/collect",
      url:"https://wechatx.offerqueens.cn/user/collect",
      data: {
        openid: store.openid
      },
      method:'POST',
      success: function(res){
        console.log("status:",res)
        if (res.data.state === 200){
          // store.collectInfos = res.data.collectList
          let newArticleInfos = that.changeArticleSub(res.data.collectList)
          store.collectInfos = newArticleInfos
        } else {
          wx.showToast({
            title: '获取我的收藏失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        console.log("status:",res.data.status)
        wx.showToast({
          title: '获取我的收藏失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
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
              wx.hideTabBar({
                animation: true
              })
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
              wx.hideTabBar({
                animation: true
              })
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
        shown:true
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
      const that=this;
      context.draw(false,function(){
        wx.canvasToTempFilePath({
          canvasId:"QRcode",
          success:res=>{
            console.log(res.tempFilePath)
            that.data.QRcodeFilePath=res.tempFilePath
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
    wx.showTabBar({
      animation: true
    })
  }

  hideQRcode(){
    this.setDataSmart({
      shown:false,
      QRcodeFilePath:"",
    })
    wx.showTabBar({
      animation: true
    })
  }

  open(){
    
  }

  changeArticleSub(articles:any){
    let newArticles = []
    for (let i=0;i<articles.length;i++){
      let article = articles[i]
      article = {
        ...article,
        sub: article.sub.replace(/↵/g,'  ')
      }
      newArticles.push(article)
    }
    return newArticles
  }


  onShow(){
    let that:any = this
    let current = this.data.current
    if (current == "history"){
      that.getHistory()
    } else if (current == "topic"){
      that.getArticle()
    } else if (current == "collect"){
      that.getCollect()
    }
  }


  onShareAppMessage(res:any) {
    return {
      title: '交大分享圈',
      imageUrl: 'https://wechatx.offerqueens.cn/weimage/practice1.png',   
    }
  }

}
