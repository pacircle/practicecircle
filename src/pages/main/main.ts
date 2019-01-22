// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    imageUrls: [
      {
        img: require('../../images/WechatIMG24.jpeg'),
        id: 'offer'
      },
      {
        img: require('../../images/Wechat2.jpg'),
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
    
    //页面加载的时候http.get推荐阅读内容
    let store:any = this.store
    if (store.openid && store.openid.length > 0){
      wx.request({
      url:"https://webackx.offerqueens.cn/article/recom",
      data: {
        openid: store.openid
      },
      method: 'POST',
      success: function(res){
        console.log(res.statusCode)
        console.log(res.data)
        console.log(store.openid,'openid')
        if ( res.statusCode === 200 && res.data.recomInfos ){
          if(store.recomInfos.length === 0 ) store.recomInfos = res.data.recomInfos
        } else {
          wx.showToast({
            title: '获取推荐列表失败1，请检查网络',
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
        url: 'http://127.0.0.1:7979/user/rotate/index',
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
        url: '../campSuccess/campSuccess',
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
}
