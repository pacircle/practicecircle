// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    campProp: {
      type: JSON,
      value: {
        answers: {
          type: Array,
          value: []
        },
        content: {
          type: String,
          value: ""
        },
        description: {
          type: String,
          value: ""
        },
        startTime: {
          type: String,
          value: ""
        },
        endTime: {
          type: String,
          value: ""
        },
        _id: {
          type: JSON,
          value: {
            $oid: ""
          }
        }
      }      
    }
  }

  async onLoad(options: any) {
    // console.log(await wxp.getUserInfo())
    console.log(JSON.parse(options.info)) 
    await this.setDataSmart({
      info: JSON.parse(options.info)
    })
  }
}
