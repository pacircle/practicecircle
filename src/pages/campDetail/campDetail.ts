// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    campProp: {
      type: JSON,
      value: {
        answers: {
          type: Array,
          value: []
        },
        content: {
          type: String,
          value: ""
        },
        description: {
          type: String,
          value: ""
        },
        startTime: {
          type: String,
          value: ""
        },
        endTime: {
          type: String,
          value: ""
        },
        _id: {
          type: JSON,
          value: {
            $oid: ""
          }
        }
      }      
    }
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info)) 
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
  }
  
  onShareAppMessage(res:any) {
    let appSetting = require('../../../src/project.config.json')
    let store:any = this.store
    wx.request({
      url: 'https://wechatx.offerqueens.cn/user/sign?',
      data: {
        appId: appSetting.appid,
        openid: store.openid,
        type: 'camp'
      },
      method: 'POST',
      success:function(res){
        if(res.data.state == 200){
          console.log(res.data.file)
          store.campFile = res.data.file
          wx.showToast({
            title: '分享训练营成功，获得训练营报名资格',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '用户登陆失败，无法获取个人分享码，请检查网络后重新启动小程序',
          icon: 'none',
          duration: 2000
        })
      }
    })
    return {
        title: '交大分享圈-分享训练营',
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
}
