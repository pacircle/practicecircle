// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

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
    commentValue: ''
  }

  async onLoad(options: any) {
    console.log(this.store.userInfo)
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info)) 
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
  }

  backToMain(e:any){
    this.app.$url.main.go()
  }

  onShareAppMessage() {
    return {
        title: 'iView Weapp',
        imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
    };
  }

  collectArticle(e:any){
    let info:any = this.data.info
    let store:any = this.store
    let that:any = this
    wx.request({
      url: "http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/collect",
      method: 'POST',
      data: {
        id: store.openid,
        articleId: info.id
      },
      success: function(res:any){
        console.log(res)
        if (res.data.status === 200){
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
      url: "http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/agree",
      method: 'POST',
      data: {
        id: store.openid,
        articleId: info.id
      },
      success: function(res:any){
        console.log(res)
        if (res.data.status === 200){
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
      let commentTime = new Date()
      wx.request({
        url: 'http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/comment',
        method: 'POST',
        data: {
          articleId: info.id,
          userId: store.openid,
          content: this.data.commentValue,
          time: commentTime
        },
        success: function(res){
          if (res.data.status === 200){      
            let commentItem = res.data.commentItem
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


}