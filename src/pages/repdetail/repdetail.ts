// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage,wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    info: {
      type: JSON,
      value: {}
      // id: {
      //   type: Number,
      //   value:0
      // },
      // nickName: {
      //   type: String,
      //   value: ''
      // },
      // src: {
      //   type: String,
      //   value: ""
      // },
      // time: {
      //   type: String,
      //   value:  ""
      // },
      // title: {
      //   type: String,
      //   value: ""
      // },
      // sub: {
      //   type: String,
      //   value: ""
      // },
      // agree: {
      //   type: Number,
      //   value: 0
      // },
      // commentList: {
      //   type: Array,
      //   value: []
      // }
    },
    content: '',
    commentValue: '',
    deletePower: false,
    readPower: true,

  }

  async onLoad(options: any) {
    
    this.store.dontRelogin=true//看文章的时候不许重新登录
    
    console.log(this.store.userInfo)
    console.log(options.info)
    // // console.log(await wxp.getUserInfo())
    // console.log(JSON.parse(decodeURIComponent(options.info)))
    // console.log(JSON.parse(decodeURIComponent(options.info)).content)
    // let info = JSON.parse(decodeURIComponent(options.info))
    // let infos = {
    //   agree: decodeURIComponent(info.agree),
    //   avatarUrl: decodeURIComponent(info.avatarUrl),
    //   commentList: decodeURIComponent(info.commentList),
    //   content: decodeURIComponent(info.content),
    //   elite: decodeURIComponent(info.elite),
    //   nickName: decodeURIComponent(info.nickName),
    //   readTime:  decodeURIComponent(info.readTime),
    //   sub: decodeURIComponent(info.sub),
    //   time: decodeURIComponent(info.time),
    //   title: decodeURIComponent(info.title),
    //   userId: decodeURIComponent(info.userId),
    //   user_agree: decodeURIComponent(info.user_agree),
    //   user_collect: decodeURIComponent(info._id)
    // }
    let infos = JSON.parse(options.info)
    console.log(infos)
    let commentListCode = infos.commentList
    let decodeCommentList = []
    for (let i=0;i<commentListCode.length;i++){
      let item = commentListCode[i]
      let newItem = {
        ...commentListCode[i],
        avatarUrl: decodeURIComponent(item.avatarUrl),
        content: decodeURIComponent(item.content)
      }
      console.log(newItem)
      decodeCommentList.push(newItem)
    }
    console.log(decodeCommentList)
    infos = {
      ...infos,
      sub: decodeURIComponent(infos.sub),
      avatarUrl: decodeURIComponent(infos.avatarUrl),
      commentList: decodeCommentList
    }
    await this.setDataSmart({
      info: infos,
      content: decodeURIComponent(infos.content).replace(/↵/g,'  ').replace(/％/g, '%').replace(/＆/g, '&').replace(/＋/g, '+').replace(/＃/g, '#').replace(/＝/g, '=').replace(/？/g, '?').replace(/﹨/g, '\\').replace(/∕/g, '/'),
    })
    // this.setDataSmart({
    //   info: JSON.parse(options.info),
    //   content: content.replace(/↵/g,'\r\n')
    // })
    // console.log(content)
    let store:any = this.store
    let that = this
    console.log(store.openid)
    console.log(JSON.parse(options.info).userId)
    if (store.openid === JSON.parse(options.info).userId){
      this.setDataSmart({
        deletePower: true
      })
    }
    console.log("精华：",JSON.parse(options.info).elite === 1)
    console.log(store.inviteMember)
    console.log(store.campMember)
    // if (JSON.parse(options.info).elite === 1 && store.inviteMember > 1){
    // if (JSON.parse(options.info).elite === 1 && store.inviteMember < 1){ //应Jaxx要求修改为精华帖可见，普通帖不可见↓
    if (JSON.parse(options.info).elite === 0 && store.inviteMember < 1){
      this.setDataSmart({
        readPower: false
      })
      wx.showModal({
        title: '获取阅读权限',
        content: '请将复盘内容分享给1人，获取复盘阅读权限',
        success: function(res){
          if(res.confirm){
            that.toQRcodeArticle()
          }
        }
      })
    }
    //增加阅读次数
    console.log(JSON.parse(options.info)._id)
    wx.request({
      url: 'https://wechatx.offerqueens.cn/user/article/read',
      // url: 'http://127.0.0.1:7979/user/article/read',
      data: {
        openid: this.store.openid,
        articleId: JSON.parse(options.info)._id.$oid
      },
      method: 'POST',
      success:function(res){
        console.log(res.data)
      },
      fail:function(res){
      }
    })
  }
  onUnload(){
    this.store.dontRelogin=false
  }

  backToMain(e:any){
    this.app.$url.main.go()
  }

  onShareAppMessage(res:any) {
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
    wx.showModal({
      title: '提示',
      content: '请点击右下角转发按键，获取个人分享码'
    })
    return {
        title: '交大分享圈-分享复盘',
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

  collectArticle(e:any){
    let info:any = this.data.info
    let store:any = this.store
    let that:any = this
    wx.request({
      url: "https://wechatx.offerqueens.cn/user/article/collect",
      // url: "http://127.0.0.1:7979/user/article/collect",
      method: 'POST',
      data: {
        openid: store.openid,
        articleId: info._id.$oid
      },
      success: function(res:any){
        console.log(res)
        if (res.data.state === 200){
          info.user_collect = !(info.user_collect)
          that.setDataSmart({
            info: info
          })
        } else {
          wx.showToast({
            title: '收藏失败，请检查网络',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function(resa:any){
        wx.showToast({
          title: '收藏失败，请检查网络',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }

  agreeArticle(e:any){
    let info:any = this.data.info
    let that:any = this
    let store:any = this.store
    wx.request({
      url: "https://wechatx.offerqueens.cn/user/article/agree",
      // url: "http://127.0.0.1:7979/user/article/agree",
      method: 'POST',
      data: {
        openid: store.openid,
        articleId: info._id.$oid
      },
      success: function(res:any){
        console.log(res)
        if (res.data.state === 200){
          info.user_agree = !(info.user_agree)
          that.setDataSmart({
            info: info
          })
        } else {
          wx.showToast({
            title: '点赞失败，请检查网络',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '点赞失败，请检查网络',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }

  onCommentChange(e:any){
    if (e.detail.detail.value){
      this.setDataSmart({
        commentValue: e.detail.detail.value
      })
    }   
  }
  async setComment(commentItem: any){
    console.log(commentItem)
    let newInfo:any = this.data.info
    console.log(newInfo)
    let store:any = this.store
    commentItem.nickName = store.userInfo.nickName
    commentItem.avatarUrl = store.userInfo.avatarUrl
    commentItem.content = this.data.commentValue
    console.log('setComment')
    console.log(newInfo.commentList)
    newInfo.commentList.push(commentItem)
    await this.setDataSmart({
      info: newInfo
    })
  }
  onSendComment(e:any){
    // let data = this.data
    let info:any = this.data.info
    let store:any = this.store
    let that:any = this 
    if(this.data.commentValue.length === 0){
      wx.showToast({
        title: '评论内容为空，请检查输入',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log(info._id)
      // let commentTime = new Date()
      wx.request({
        url: 'https://wechatx.offerqueens.cn/user/article/comment/index',
        method: 'POST',
        data: {
          articleId: info._id.$oid,
          userId: store.openid,
          content: this.data.commentValue,
          nickName: store.userInfo.nickName,
          avatarUrl: store.userInfo.avatarUrl
          // time: commentTime
        },
        success: function(res){
          if (res.data.state === 200){      
            let commentItem = res.data.data.commentItem
            that.setComment(commentItem)
            // console.log(info.commentList)
            // console.log(commentItem)
            // info.commentList.push(commentItem)
            // console.log(that.data.commentValue)
            // console.log(data)
            // that.setDataSmart({
            // })
            // that.setComment(info)
            // let newCommentList = info.commentList.push(commentItem)
            // console.log(newCommentList)
            // info.commentList = newCommentList
            // console.log(this.data.commentValue)
            // let commentItem = new Object({
            //   id: commentId,
            //   content: this.data.commentValue,
            //   nickName: store.nickName,
            //   src: store.avatarUrl,
            //   time: commentTime
            // })
            // info.commentList.push(commentItem)
            // console.log('添加评论成功')
            // store.articleInfos.map((article:any) => {
            //   console.log(article)
            //   console.log(info.id)
            //   if (article.id === info.id){
            //     console.log(info.commentList)
            //   }
            // })
          } else {
            wx.showToast({
              title: '添加评论失败，请检查网络',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(res){
          wx.showToast({
            title: '添加评论失败1，请检查网络',
            icon: 'none',
            duration: 2000 
          })
        }
      })
    }
  }

  async deleteArticle(e:any){
    console.log(e)
    let info:any = this.data.info
    let store:any = this.store
    // let that:any = this 
    // let store:any = this.store
    wx.showModal({
      title: '提示',
      content: '是否删除文章？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: "https://wechatx.offerqueens.cn/user/article/delete",
            method: "POST",
            data: {
              articleId: info._id.$oid,
              openid: store.openid,
            },
            success:function(res){
              if (res.data.state === 200){
                // let articleInfos = store.articleInfos
                // articleInfos.filter((item:any) => item._id === info._id)
                // store.articleInfos = articleInfos
                // console.log(articleInfos)
                // console.log('arti',articleInfos.length)
                // console.log(store.articleInfos)
                wxp.navigateBack({delta:1});
              } else {
                wx.showToast({
                  title: '删除文章失败，请检查网络',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function(res){
              wx.showToast({
                title: '删除文章失败，请检查网络',
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  toQRcodeArticle(){
    wxp.navigateTo({
      url: '../QRcodeArticle/QRcodeArticle',
    })
  }
}