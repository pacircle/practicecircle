// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    imageUrls: [
      "http://seopic.699pic.com/photo/50077/0332.jpg_wh1200.jpg",
      "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",    
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
    wx.request({
      url:"http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/user/recom",
      data: {
        id: store.openid
      },
      success: function(res){
        console.log(store.recomInfos.length)
        console.log(res.data.status)
        if ( res.data.status === 200){
          if(store.recomInfos.length === 0 ) store.recomInfos = res.data.recomInfos
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
}
