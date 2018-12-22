// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    avatar: '',
    nickName: '',
    current: "history",

    hisInfos: [],
    //topic: [],
    //comment: [],
    collect: []

  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    if (this.data.avatar.length === 0 && this.store.userInfo){
      this.setDataSmart({
        avatar: this.store.userInfo.avatarUrl,
        nickName: this.store.userInfo.nickName
      })
    }

    //get相关内容
    let store:any = this.store;
    await wx.request({
      url:"http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/article/history",
      data: {
        id: store.openid
      },
      success: function(res){
        console.log("status:",res.data.status)
        if (res.data.status === 200){
          store.hisInfos = res.data.hisInfos
        } else {
          wx.showToast({
            title: '获取阅读历史失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取阅读历史失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })

    await wx.request({
      url:"http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/article/collect",
      data: {
        id: store.openid
      },
      success: function(res){
        console.log("status:",res.data.status)
        if (res.data.status === 200){
          store.collectInfos = res.data.collectInfos
        } else {
          wx.showToast({
            title: '获取我的收藏失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '获取我的收藏失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })

  }

  handleChange (e:any) {
    this.setDataSmart({
        current: e.detail.key
    });
    console.log("switch to tag: ",this.data.current)
  }


  clickDetail(e:any){
    wx.navigateTo({
      url: '../repdetail/repdetail?info=' + JSON.stringify(e.currentTarget.dataset.info),
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
