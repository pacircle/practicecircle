/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {appify, wxp, MyApp, MyStore} from 'base/'

@appify(new MyStore(), {pages: require('./app.cjson?pages'), tabBarList: require('./app.cjson?tabBar.list')})
export default class extends MyApp {
  async onLaunch() {
    // 展示本地存储能力
    let logs = wxp.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wxp.setStorageSync('logs', logs)

    // 登录
    let appSetting = require('../src/project.config.json')
    console.log(appSetting.appid)

    let {code} = await wxp.login()
    console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId

    // 获取用户信息
    let setting = await wxp.getSetting()
    if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
      let store:any = this.store
      let res = await wxp.getUserInfo()
      console.log('微信 userInfo %o', res.userInfo)
      if (res && code){
        wx.request({
          url: "http://127.0.0.1:7979/user/login",
          data: {
            userInfo: res.userInfo,
            jsCode: code,
            appId: appSetting.appid
          },
          method: 'POST',
          success:function(ress:any){
            console.log(ress.data)
            if (ress.statusCode === 200){
              if (!store.userInfo && ress.data.openid){
                // console.log(ress,'成功')
                store.userInfo = res.userInfo
                store.openid = ress.data.openid
              } else {
                console.log(ress.data)
                wx.showToast({
                  title: '获取信息失败，请使用正版小程序',
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
            // console.log('微信 userInfo %o', res.userInfo)
          },
          fail:function(res){
            wx.showToast({
              title: '用户登陆失败，请检查网络后重新启动小程序',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
      // this.store.userInfo = res.userInfo  // 将用户信息存入 store 中
    } else {
      console.log('授权未通过')
      wx.showToast({
        title: '授权通过才能正确使用小程序哦',
        icon: 'none',
        duration: 2000
      })
    }
  }
}

