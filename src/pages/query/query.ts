// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    value: ''
  }

  async onLoad(options: any) {
    console.log(this.store)
  }

  handleInputChange(event:any) {
    const { detail = {} } = event;
    const { value = '' } = detail;
    this.setDataSmart({ value });

    this.triggerEvent('change', event,{});
  }

  handleInputFocus(event:any) {
    this.triggerEvent('focus', event,{});
  }

  handleInputBlur(event:any) {
    this.triggerEvent('blur', event,{});
  }
}
