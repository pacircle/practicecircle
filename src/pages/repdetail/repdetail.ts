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
    commentValue: '',
    deletePower: false
  }

  async onLoad(options: any) {
    console.log(this.store.userInfo)
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info)) 
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
    let store:any = this.store
    console.log(store.openid)
    console.log(JSON.parse(options.info).userId)
    if (store.openid === JSON.parse(options.info).userId){
      this.setDataSmart({
        deletePower: true
      })
    }
    //增加阅读次数
    console.log(JSON.parse(options.info)._id)
    wx.request({
      url: 'https://webackx.offerqueens.cn/user/article/read',
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

  backToMain(e:any){
    this.app.$url.main.go()
  }

  onShareAppMessage(res:any) {
    console.log(res)
    return {
        title: '交大分享圈',
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

  collectArticle(e:any){
    let info:any = this.data.info
    let store:any = this.store
    let that:any = this
    wx.request({
      url: "https://webackx.offerqueens.cn/user/article/collect",
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
      url: "https://webackx.offerqueens.cn/user/article/agree",
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
    let store:any = this.store
    commentItem.nickName = store.userInfo.nickName
    commentItem.avatarUrl = store.userInfo.avatarUrl
    commentItem.content = this.data.commentValue
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
        url: 'https://webackx.offerqueens.cn/user/article/comment/index',
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
            url: "https://webackx.offerqueens.cn/user/article/delete",
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

}