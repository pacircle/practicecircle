// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    nowKey: 'second',
    viewlist:[
      {
        title: '99个互联网常用词汇，建议收藏“食用”',
        url: 'https://wechatx.offerqueens.cn/weimage/list1.png',
        sub: '想入行互联网，怎么能不了解互联网流行语呢？此文章强烈建议互联网小白同学们收藏“食用”！',
        key: 'first'
      },
      {
        title: 'UGC、PGC、OGC到底有什么区别？',
        url: 'https://wechatx.offerqueens.cn/weimage/list2.png',
        sub: '在国内可见的网站平台上，UGC、OGC和PGC是常见的内容生产模式。',
        key: 'second'
      },
      {
        title: '好的产品经理需要哪些素质',
        url: 'https://wechatx.offerqueens.cn/weimage/list3.jpg',
        sub: '面试官面试应聘PM的面试者，怎么判断他是否是一个好的产品经理或者是一个有可能成为一个好的产品经理？',
        key: 'third'
      },
      {
        title: '什么是PMF？什么是MVP？',
        url: 'https://wechatx.offerqueens.cn/weimage/list4.png',
        sub: '一、什么是PMF？',
        key: 'fourth'
      },
      {
        title: 'to B的产品经理和to C的产品经理有什么差别',
        url: 'https://wechatx.offerqueens.cn/weimage/list5.jpg',
        sub: '作为一个主要面向企业客户的产品的产品经理，如何体现自己的价值?深度体现在什么地方?',
        key: 'fifth'
      }
    ]
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
  }

  clickItem(e:any){
    console.log(e.currentTarget.dataset.key)
    this.setDataSmart({
      show: false,
      nowKey: e.currentTarget.dataset.key
    })
    wx.navigateTo({
      url: '../viewitem/viewitem?key=' + e.currentTarget.dataset.key,
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
