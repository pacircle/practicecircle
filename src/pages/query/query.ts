// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'
var WxSearch = require('../../base/wxSearch/wxSearch.js')
@pagify()
export default class extends MyPage {
  data = {
    value: ''
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
  }

  wxSearchInput(e:any) {
    var that = this
    WxSearch.wxSearchInput(e,that);
  }

  wxSerchFocus(e:any) {
    console.log('wxSerchFocus')
    var that = this
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
}
