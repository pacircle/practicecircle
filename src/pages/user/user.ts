// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    avatar: '',
    current: "history"
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    if (this.data.avatar.length === 0 && this.store.userInfo){
      this.setDataSmart({
        avatar: this.store.userInfo.avatarUrl
      })
    }
  }

  handleChange (e:any) {
    this.setDataSmart({
        current: e.detail.key
    });
  }
}
