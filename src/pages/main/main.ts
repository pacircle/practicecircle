// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

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
  }

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
