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
    practice: require("../../images/practice.png")
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
  }
  async getUserInfos(e:any){
     // 登录
     let {code} = await wxp.login()
     console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId
 
     // 获取用户信息
     let setting = await wxp.getSetting()
     if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
       // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
       let res = await wxp.getUserInfo()
       console.log('微信 userInfo %o', res.userInfo)
       this.store.userInfo = res.userInfo  // 将用户信息存入 store 中
       this.app.$url.main.go()
     } else {
       console.log('没有授权过')
       wxp.showToast({
         title: '请授权获取用户信息',
       })
     }
     if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
      this.app.$url.main.go()
    }
  }
}
