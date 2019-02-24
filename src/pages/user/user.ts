// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

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

  toQRcodeArticle(){
    wxp.navigateTo({
      url: '../QRcodeArticle/QRcodeArticle',
    })
  }

  toQRcodeCamp(){
    wxp.navigateTo({
      url: '../QRcodeCamp/QRcodeCamp',
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
        sub: article.sub.replace(/↵/g,'  ').replace(/％/g, '%').replace(/＆/g, '&').replace(/＋/g, '+').replace(/＃/g, '#').replace(/＝/g, '=').replace(/？/g, '?').replace(/﹨/g, '\\').replace(/∕/g, '/'),

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
