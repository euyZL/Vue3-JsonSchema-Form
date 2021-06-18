/*
 * @Author: your name
 * @Date: 2021-06-11 00:13:42
 * @LastEditTime: 2021-06-15 23:30:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\theme-default\NumberWidget.tsx
 */
import { defineComponent } from 'vue'
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const NumberWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        const num = Number(value)
        if (Number.isNaN(num)) {
          props.onChange(undefined)
        } else {
          props.onChange(num)
        }
      }

      return () => {
        return (
          <input
            type="number"
            value={props.value as any}
            onInput={handleChange}
          />
        )
      }
    },
  }),
)

export default NumberWidget
