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
    
    //获取高度
    try {
      var res = wx.getSystemInfoSync()
      this.store.windowHeight=res.windowHeight
      this.store.windowWidth=res.windowWidth
      console.log('屏幕高度:',this.store.windowHeight)
      console.log('屏幕宽度:',this.store.windowWidth)
    } catch (e) {
      console.log("获取屏幕宽度高度失败")
    // Do something when catch error
    }
  }
  onHide(){
    this.store.needReLogin=true
  }
  onShow(){
    
    if(this.store.needReLogin&&this.store.reLogin!=null&&!this.store.dontRelogin){
      this.store.needReLogin=false
      this.store.reLogin()
    }
    
  }
}

