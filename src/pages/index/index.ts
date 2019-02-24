/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, wxp, MyPage} from 'base/'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    count: 10,
    npmToast: false,
    demoToast: false,
    motto: '',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo'),
    practice: require("../../images/practice.png"),
    scene: ''
  }

  onShow() {
    this.setDataSmart({motto: 'See you again'})
  }

  onClickAvatarImage() {
    // 跳转到 logs 页面
    this.app.$url.logs.go({id: 1})
    this.setDataSmart({motto: '开始跳转到 logs 页面'})
  }

  onClickOpenButton(e: any) {
    console.log(e,'onClick')
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      this.store.userInfo = e.detail.userInfo
      if (this.data.scene.length > 0){
        this.invite(this.data.scene)
      } else {
        this.getUserInfos()
      }
      this.app.$url.main.go()
    } else {
      //用户按了拒绝按钮
      wxp.showToast({
        title: '请授权获取用户信息',
        icon: 'none',
        duration: 2000
      })
    }
    

    // 组件内数据还是用 setData
    this.setDataSmart({motto: '点击了『获取头像昵称』按钮'})
  }

  // showToast() {
  //   console.log('showToast')
  //   this.setDataSmart({npmToast: true})
  // }
  // hideToast() {
  //   console.log('hideToast')
  //   this.setDataSmart({npmToast: false})
  // }

  // toggleDemoToast() {
  //   this.setDataSmart({demoToast: !this.data.demoToast})
  // }

  // increase() {
  //   this.setDataSmart({count: this.data.count + 1})
  // }

  async onLoad(options: any) {
    this.store.reLogin=this.getUserInfos
    // 使用 require 加载图片
    // console.log('可以使用 require 的方法加载图片: %o', require('images/heart@3x.png'))
    // 轻松读取全局数据
    console.log('当前 Store: %o', this.store)
    console.log('options',options)
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
      this.setDataSmart({
        scene: scene
      })
      // this.invite(scene)
    } else {
      console.log("no scene");
    }
    let setting = await wxp.getSetting()
     console.log(setting)
     if (setting.authSetting['scope.userInfo']) {
      this.app.$url.main.go()
     }
    if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
      this.app.$url.main.go()
    }
    // wxp.hideTabBar({})
  }
  async getUserInfos(){
     // 登录
     let store:any = this.store
     let that:any = this
     let {code} = await wxp.login()
     console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId

     let appSetting = require('../../../src/project.config.json')
     console.log(appSetting.appid)
     
     // 获取用户信息
     let setting = await wxp.getSetting()
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
                that.app.$url.main.go()
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
      }
     } else {
       console.log('没有授权过')
       wxp.showToast({
         title: '请授权获取用户信息',
         icon: 'none',
              duration: 2000
       })
       let res = await wxp.getUserInfo()
       console.log(res,'res')
     }
     if (!this.store.userInfo && !this.data.canIUseOpenButton) {
       console.log('微信兼容版本')
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
      this.app.$url.main.go()
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


  onGotUserInfo(e:any){
    console.log(e)
  }
}
