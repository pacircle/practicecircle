// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    reInfos: [{
      id: 0,
      nickName: '用户A',
      src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
      time: "15分钟前",
      title: "2018年秋招腾讯产品经理面试复盘，已offer",
      sub: "20字的简要内容",
      agree: 15,
      commentList: ["评论1","评论2","评论3"]
    },{
      id: 1,
      nickName: '用户B',
      src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
      time: "15分钟前",
      title: "2018年秋招腾讯产品经理面试复盘，已offer",
      sub: "20字的简要内容",
      agree: 10,
      commentList: ["评论1","评论2","评论3"]
    }]
  }

  async onLoad(options: any) {
    console.log(this.store)
  }
  clickDetail(e:any){
    console.log(e.target.dataset.info)
    // this.app.$url.repdetail.go({
    //   infos: JSON.parse(e.target.dataset.infos)
    // })
    wx.navigateTo({
      url: '../repdetail/repdetail?info=' + JSON.stringify(e.target.dataset.info),
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
