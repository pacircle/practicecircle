// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    info: {
      type: JSON,
      value: {}
      // id: {
      //   type: Number,
      //   value:0
      // },
      // nickName: {
      //   type: String,
      //   value: ''
      // },
      // src: {
      //   type: String,
      //   value: ""
      // },
      // time: {
      //   type: String,
      //   value:  ""
      // },
      // title: {
      //   type: String,
      //   value: ""
      // },
      // sub: {
      //   type: String,
      //   value: ""
      // },
      // agree: {
      //   type: Number,
      //   value: 0
      // },
      // commentList: {
      //   type: Array,
      //   value: []
      // }
    }
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info))
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
  }

  backToMain(e:any){
    this.app.$url.main.go()
  }
}