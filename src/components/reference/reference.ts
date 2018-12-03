// 此文件是由模板文件 ".dtpl/component/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {MyComponent, comify} from 'base'

@comify()
export default class extends MyComponent {
  /**
   * 组件的属性列表
   */
  properties = {
    image: {
      type: String,
      value: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg"
    },
    types: {
      type: String,
      value: '面试真题复盘'
    },
    url: {
      type: String,
      value: 'replay'
    }
  }

  /**
   * 组件的初始数据
   */
  data = {
   
  }

  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop: string, newValue: any, oldValue: any) {

  }
}

