// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    repInfos: [],
    articleInfos: [],
    orderInfo: "按时间顺序排序",
    visible: false,
    actions: [
      {
          name: '按时间顺序排序',
      },
      {
          name: '按点赞数量排序',
      },
      {
          name: '按评论数量排序'
      },
  ],
  }

  async onLoad(options: any) {
    console.log(this.store)
    let store:any = this.store
    let that:any = this
    if (!store.articleInfos || store.articleInfos.length === 0 ){
      wx.request({
        url: "http://result.eolinker.com/2iwkBiged241c5a42bdfb8b083224dbf190f8b770cac539?uri=/article/index",
        data: {
          openid: store.openid
        },
        method: 'GET',
        success:function(ress:any){
          console.log(ress.data.status)
          if (ress.data.status === 200){
              console.log(ress.data.articleInfos)
              if (!store.articleInfos){
                store.articleInfos = ress.data.articleInfos
                that.setArticle(store.articleInfos)
              }         
          } else {
            wx.showToast({
              title: '用户登陆失败1，请检查网络后重新启动小程序',
              icon: 'none',
              duration: 2000
            })
          } 
          // console.log('微信 userInfo %o', res.userInfo)
        },
        fail:function(res){
          wx.showToast({
            title: '获取文章失败，请检查网络后重新启动小程序',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    //提供一个模版而已，后面要删掉的
    if(this.store.repInfos.length==0){
      this.store.repInfos.unshift({
        id: 0,
        nickName: '用户A',
        src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        time: "15分钟前",
        title: "2018年秋招腾讯产品经理面试复盘，已offer",
        sub: "20字的简要内容...",
        agree: 15,
        content: "500字的主要内容",
        commentList: [{
          id: '0',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        },{
          id: '1',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AB',
          time: '10分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      },{
        id: 1,
        nickName: '用户B',
        src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        time: "15分钟前",
        title: "2018年秋招腾讯产品经理面试复盘，已offer",
        sub: "20字的简要内容",
        content: "500字的主要内容",
        agree: 10,
        commentList: [{
          id: '0',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户BA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      })
    } 
  }
  
  async setArticle(articles: Array<JSON>){
    await this.setDataSmart({
      articleInfos: articles
    }) 
  }
  async onShow(){
    let store:any = this.store
    await this.setDataSmart({
      repInfos:this.store.repInfos,
      articleInfos: store.articleInfos
    })
  }

  toRepnew(){
    this.app.$url.repnew.go();
  }
  handleOpen() {
    this.setDataSmart({
        visible: true
    });
  }
  handleClickItem ({ detail }:any) {
    const index = detail.index + 1;
    console.log(index)
    if (index === 1){
      this.setDataSmart({
        visible: false,
      });
    }else if (index === 2){
      this.setDataSmart({
        visible: false,
        orderInfo: '按点赞数量排序'
      });
    } else if (index === 3){
      this.setDataSmart({
        visible: false,
        orderInfo: '按评论数量排序'
      });
    }
  }
  handleCancel () {
    this.setDataSmart({
        visible: false
    });
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
