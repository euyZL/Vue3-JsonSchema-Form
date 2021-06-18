/*
 * @Author: your name
 * @Date: 2021-06-09 21:13:03
 * @LastEditTime: 2021-06-11 00:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\theme-default\index.tsx
 */
import SelectionWidget from './SelectionWidget'
import TextWidget from './TextWidget'
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'
import NumberWidget from './NumberWidget'

const CommonWidget: CommonWidgetDefine = defineComponent({
  name: 'CommonWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    return () => {
      return null
    }
  },
})

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget,
  },
}
