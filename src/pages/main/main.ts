// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    imageUrls: [
      {
        img: "https://wechatx.offerqueens.cn/weimage/WechatIMG24.jpeg",
        id: 'offer'
      },
      {
        img: "https://wechatx.offerqueens.cn/weimage/Wechat2.jpg",
        id: 'every'
      }      
    ],
    reInfos: [
      {
        image: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        types: "面试复盘",
        url: "replays"
      },
      {
        image: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        types: "咨询问答",
        url: "query"
      }
    ],
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo'),
    // current: 'document',
    // tabList: [
    //   {
    //     tag: "document",
    //     icon: "document",
    //     cuIcon:"document_fill",
    //     status: true,
    //     title: "阅读"
    //   },
    //   {
    //     tag:"interactive",
    //     icon:"interactive", 
    //     cuIcon:"interactive_fill",
    //     status: false,
    //     title: "讨论"
    //   },
    //   {
    //     tag:"search",
    //     icon:"search", 
    //     cuIcon:"searchfill",
    //     status: false,
    //     title: "搜索"
    //   },
    //   {
    //     tag: "mime",
    //     icon: "mine",
    //     cuIcon: "mine_fill",
    //     status: false,
    //     title: "我的"
    //   }
    // ]
  }

  

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    // wxp.showTabBar({})
    
    console.log('当前 Store: %o', this.store)
    console.log('options',options)
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
      this.invite(scene)
    } else {
      console.log("no scene");
    }

    this.getUserInfos()

    this.getRecommendList()
    //仅提供一个模版 后面要删掉的
    // if(this.store.repInfos.length==0){
    //   this.store.repInfos.unshift({
    //     id: 0,
    //     nickName: '用户A',
    //     src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
    //     time: "15分钟前",
    //     title: "2018年秋招腾讯产品经理面试复盘，已offer",
    //     sub: "20字的简要内容...",
    //     agree: 15,
    //     content: "500字的主要内容",
    //     commentList: [{
    //       id: '0',
    //       src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
    //       nickName: '用户AA',
    //       time: '5分钟前',
    //       zone: '地区/学校',
    //       company: '公司名',
    //       post: '岗位',
    //       content: '具体问题。。。。'
    //     },{
    //       id: '1',
    //       src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
    //       nickName: '用户AB',
    //       time: '10分钟前',
    //       zone: '地区/学校',
    //       company: '公司名',
    //       post: '岗位',
    //       content: '具体问题。。。。'
    //     }]
    //   },{
    //     id: 1,
    //     nickName: '用户B',
    //     src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
    //     time: "15分钟前",
    //     title: "2018年秋招腾讯产品经理面试复盘，已offer",
    //     sub: "20字的简要内容",
    //     content: "500字的主要内容",
    //     agree: 10,
    //     commentList: [{
    //       id: '0',
    //       src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
    //       nickName: '用户BA',
    //       time: '5分钟前',
    //       zone: '地区/学校',
    //       company: '公司名',
    //       post: '岗位',
    //       content: '具体问题。。。。'
    //     }]
    //   })
    // }
  }



  toReplays(){
    wxp.switchTab({
      url:"/pages/replays/replays"
    })
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
    console.log(info)
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
  /*
  select(str:string){
    console.log(str.search("腾讯"))
    if (str.search("腾讯")!=-1) 
      return true;
    else
      return false;
  }
  */


  // itemChange (e:any) {
  //   let key = e.currentTarget.dataset.key
  //   let tabList = this.properties.tabList
  //   for (let i=0; i < tabList.length;i++){
  //     if (tabList[i].tag === key){
  //       tabList[i].status = true
  //     } else {
  //       tabList[i].status = false
  //     }
  //   }
  //   this.setDataSmart({
  //     tabList: tabList
  //   })
  // }  

  rotateClick(e:any){
    let store:any = this.store
    // let that:any = this
    if(e.target.dataset.info.id === 'offer'){
      wx.request({
        url: 'https://wechatx.offerqueens.cn/user/rotate/index',
        data: {
          openid: store.openid
        },
        success: function(res){
          if (res.data.state === 200){
            console.log(res.data.rotate.address)
            // store.address = res.data.rotate.address
            wx.navigateTo({
              url: '../web/web?info=' + res.data.rotate.address,
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
        },
        fail: function(res){
          wx.showToast({
            title: '获取首页地址失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else if (e.target.dataset.info.id === 'every'){
      wx.navigateTo({
        url: '../firstview/firstview',
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
  }

  async invite(scene:any){
    let {code} = await wxp.login()
    let appSetting = require('../../../src/project.config.json')
     console.log(appSetting.appid)
    //  let store:any = this.store
    //  let that:any = this

     // 获取用户信息
     let setting = await wxp.getSetting()
     console.log(setting)
     if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
       // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
       let res = await wxp.getUserInfo()
       console.log('微信 userInfo %o', res.userInfo)
      //  this.app.$url.main.go()
      if (res && code){
        this.store.userInfo = res.userInfo  // 将用户信息存入 store 中
        wx.request({
          url: "https://wechatx.offerqueens.cn/user/invite",
          data: {
            userInfo: res.userInfo,
            jsCode: code,
            appId: appSetting.appid,
            openid: scene.substring(0,scene.length-4),
            type: scene.substring(scene.length-4,scene.length)
          },
          method: 'POST',
          success: function(ress:any){
            if(ress.data.state === 403){
              wx.showToast({
                title: '分享给自己无法获得权限,点击一键登录进入小程序',
                icon: 'none',
                duration: 2000
              })
            } else if (ress.data.state === 200){
              wx.showToast({
                title: '邀请成功',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '请求数据失败，请检查网络后重新启动小程序',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function(res){
            wx.showToast({
              title: '用户登陆失败，请检查网络后重新启动小程序',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
     } else {
       console.log('没有授权过')
       wxp.showToast({
         title: '请授权获取用户信息',
         icon: 'none',
         duration: 2000
       })
     }
  }




  
  async getUserInfos(){
     // 登录
     let store:any = this.store
     let that:any = this
    // console.log('getUserINfos')
     let {code} = await wxp.login()
     console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId
     
     let appSetting = require('../../../src/project.config.json')
     console.log(appSetting.appid)
     
     // 获取用户信息
     let setting = await wxp.getSetting()
     console.log(setting)
     if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
       // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
       let res = await wxp.getUserInfo()
       console.log('微信 userInfo %o', res.userInfo)
      //  this.app.$url.main.go()
      if (res && code){
        this.store.userInfo = res.userInfo  // 将用户信息存入 store 中
        wx.request({
          url: "https://wechatx.offerqueens.cn/user/login",
          // url: "http://127.0.0.1:7979/user/login",
          data: {
            userInfo: res.userInfo,
            jsCode: code,
            appId: appSetting.appid
          },
          method: 'POST',
          success: function(ress:any){
            console.log(ress)
            if (ress.statusCode === 200){
              if (store.userInfo && ress.data.openid){
                // console.log(ress,'成功')
                store.userInfo = res.userInfo
                store.openid = ress.data.openid
                store.inviteMember = ress.data.inviteMember
                store.campMember = ress.data.campMember
                that.getRecommendList()
                // that.app.$url.main.go()
              } else {
                wx.showToast({
                  title: '请求失败，请检查网络后重新启动小程序',
                  icon: 'none',
                  duration: 2000
                })
              }           
            } else {
              wx.showToast({
                title: '用户登陆失败，请检查网络后重新启动小程序',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function(res){
            wx.showToast({
              title: '用户登陆失败，请检查网络后重新启动小程序',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        console.log(res)
        console.log(code)
      }
     } else {
       console.log('没有授权过1')
       wxp.showToast({
         title: '请授权获取用户信息',
         icon: 'none',
              duration: 2000
       })
     }
     if (!this.store.userInfo && !this.data.canIUseOpenButton) {
       console.log('微信兼容版本')
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
      this.app.$url.main.go()
    }
  }
  onShow(){
    this.getRecommendList()
  }

  
  onShareAppMessage(res:any) {
    return {
      title: '交大分享圈',
      imageUrl: 'https://wechatx.offerqueens.cn/weimage/practice1.png',   
    }
  }
  async getRecommendList(){
    //页面加载的时候http.get推荐阅读内容
    let store:any = this.store
    let that:any = this
    if (store.openid && store.openid.length > 0){
      wx.request({
      url:"https://wechatx.offerqueens.cn/article/recom",
      // url:"http://127.0.0.1:7979/article/recom",
      data: {
        openid: store.openid
      },
      method: 'POST',
      success: function(res){
        console.log(res.statusCode)
        console.log(res.data)
        console.log(store.openid,'openid')
        if ( res.statusCode === 200 && res.data.recomInfos ){
          // if(store.recomInfos.length === 0 ) {
          //   let newArticleInfos = that.changeArticleSub(res.data.recomInfos)
          //   // store.articleInfos = newArticleInfos
          //   store.recomInfos = newArticleInfos
          // }
          let newArticleInfos = that.changeArticleSub(res.data.recomInfos)
          store.recomInfos = newArticleInfos      
        } else {
          wx.showToast({
            title: '获取推荐列表失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取推荐列表失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
    }
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


}
