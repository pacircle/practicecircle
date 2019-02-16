// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'
var WxSearch = require('../../base/wxSearch/wxSearch.js')
@pagify()
export default class extends MyPage {
  data = {
    value: '',
    searchList: [],
    focus: true,
    inputValue: "",
    searchInfo: ""
  }

  async onLoad(options: any) {
    console.log(this.store)
    let that:any = this;
    WxSearch.init(that,43,['产品经理','腾讯','阿里'])
    WxSearch.initMindKeys(['产品经理','腾讯','阿里'])
  }

  // handleInputChange(event:any) {
  //   const { detail = {} } = event;
  //   const { value = '' } = detail;
  //   this.setDataSmart({ value });

  //   this.triggerEvent('change', event,{});
  // }

  // handleInputFocus(event:any) {
  //   this.triggerEvent('focus', event,{});
  // }

  // handleInputBlur(event:any) {
  //   this.triggerEvent('blur', event,{});
  // }
  wxSearchFn(e:any) {
    var that = this;
    WxSearch.wxSearchAddHisKey(that);
    console.log(WxSearch)
    that.setDataSmart({
      focus: false,
      searchInfo: that.data.inputValue
    })
    that.sendSearch(that.data.inputValue)
  }

  wxSearchInput(e:any) {
    var that = this
    WxSearch.wxSearchInput(e,that);
    console.log(e)
    that.setDataSmart({
      inputValue: e.detail.value
    })
  }

  wxSerchFocus(e:any) {
    console.log('wxSerchFocus')
    var that = this
    that.setDataSmart({
      focus: true
    })
    WxSearch.wxSearchFocus(e,that);
  }

  wxSearchBlur(e:any) {
    console.log('wxSearchBlur')
    var that = this
    WxSearch.wxSearchBlur(e,that);
  }

  wxSearchKeyTap(e:any) {
    console.log('wxSearchKeyTap')
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
    console.log(e.currentTarget.dataset.key)
    that.setDataSmart({
      focus: false,
      searchInfo: e.currentTarget.dataset.key
    })
    that.sendSearch(e.currentTarget.dataset.key)
  }
  wxSearchDeleteKey(e:any) {
    console.log('wxSearchDeleteKey')
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  }
  wxSearchDeleteAll(e:any) {
    console.log('wxSearchDeleteAll')
    var that:any = this;
    WxSearch.wxSearchDeleteAll(that);
  }
  wxSearchTap(e:any) {
    console.log('wxSearchTap')
    var that = this;
    WxSearch.wxSearchHiddenPancel(that);
  }

  async sendSearch(searchInfo:String){
    let store:any = this.store
    let that:any = this
    wx.request({
      url: "https://wechatx.offerqueens.cn/article/search",
      // url: "http://127.0.0.1:7979/article/search",
      data: {
        searchInfo:searchInfo,
        openid: store.openid, 
      },
      method: 'POST',
      success: function(res){
        console.log(res)
          if (res.data.state === 200){
              console.log(res.data)
              let newArticleInfos = that.changeArticleSub(res.data.searchList)
              store.searchList = newArticleInfos
              that.setSearchArticle(store.searchList)
          } else {
            wx.showToast({
              title: '搜获信息为空',
              icon: 'none',
              duration: 2000
            })
          }
      },
      fail: function(ress){
        wx.showToast({
          title: '搜获信息错误，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  async setSearchArticle(articles: Array<JSON>){
    await this.setDataSmart({
      searchList: articles
    }) 
    if (articles.length == 0){
      wx.showToast({
        title: '没有搜索到相关文章，请尝试搜索其他关键字',
        icon: 'none',
        duration: 2000
      })
    }
  }

  clickDetail(e:any){
    console.log(e.target.dataset.info)
    // this.app.$url.repdetail.go({
    //   infos: JSON.parse(e.target.dataset.infos)
    // })
    let commentList = e.target.dataset.info.commentList
    let commentListCode = []
    for (let i =0;i<commentList.length;i++){
      let item = commentList[i]
      let codeItem = {
        articleId: item.articleId,
        avatarUrl: encodeURIComponent(item.avatarUrl),
        content: encodeURIComponent(item.content),
        time: item.time,
        userId: item.userId,
        _id: item._id
      }
      commentListCode.push(codeItem)
    }
    let info = {
      ...e.currentTarget.dataset.info,
      content: encodeURIComponent(e.currentTarget.dataset.info.content),
      sub: encodeURIComponent(e.currentTarget.dataset.info.sub),
      avatarUrl: encodeURIComponent(e.currentTarget.dataset.info.avatarUrl),
      commentList: commentListCode
    }
    console.log(info)
    wx.navigateTo({
      url: '../repdetail/repdetail?info=' + JSON.stringify(info),
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


  changeArticleSub(articles:any){
    let newArticles = []
    for (let i=0;i<articles.length;i++){
      let article = articles[i]
      article = {
        ...article,
        sub: article.sub.replace(/↵/g,'  ')
      }
      newArticles.push(article)
    }
    return newArticles
  }

  onShow(){
    let searchInfo = this.data.searchInfo
    if (searchInfo.length > 0){
      this.sendSearch(searchInfo)
    }
  }
  
}
