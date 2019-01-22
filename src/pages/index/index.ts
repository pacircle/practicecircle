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
    // 轻松修改全局数据
    this.store.userInfo = e.detail.userInfo

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
    // 使用 require 加载图片
    // console.log('可以使用 require 的方法加载图片: %o', require('images/heart@3x.png'))
    // 轻松读取全局数据
    console.log('当前 Store: %o', this.store)
    // if (!this.store.userInfo && !this.data.canIUseOpenButton) {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   let {userInfo} = await wxp.getUserInfo()
    //   this.store.userInfo = userInfo
    // }
    // wxp.hideTabBar({})
  }
  async getUserInfos(e:any){
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
          url: "https://webackx.offerqueens.cn/user/login",
          data: {
            userInfo: res.userInfo,
            jsCode: code,
            appId: appSetting.appid
          },
          method: 'POST',
          success: function(ress:any){
            if (ress.statusCode === 200){
              if (store.userInfo && ress.data.openid){
                // console.log(ress,'成功')
                store.userInfo = res.userInfo
                store.openid = ress.data.openid
                store.inviteMember = 0
                that.app.$url.main.go()
              } else {
                wx.showToast({
                  title: '用户登陆失败，请检查网络后重新启动小程序',
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
     }
     if (!this.store.userInfo && !this.data.canIUseOpenButton) {
       console.log('微信兼容版本')
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
      this.app.$url.main.go()
    }
  }
}
