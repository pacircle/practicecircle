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
          url: "http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/login",
          data: {
            userInfo: res.userInfo,
            code: code
          },
          method: 'POST',
          success:function(ress:any){
            if (ress.data.status === 200){
              if (!store.userInfo && ress.data.openid){
                console.log(ress,'成功')
                store.userInfo = res.userInfo
                store.openid = ress.data.openid
              } else {
                console.log(ress.data)
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
      console.log('没有授权过')
    }
  }
}

