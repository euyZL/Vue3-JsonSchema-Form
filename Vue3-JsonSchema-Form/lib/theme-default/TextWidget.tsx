/*
 * @Author: your name
 * @Date: 2021-06-10 23:35:06
 * @LastEditTime: 2021-06-17 13:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\theme-default\TextWidget.tsx
 */
import { defineComponent, computed, markRaw } from 'vue'
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const TextWidget: CommonWidgetDefine = markRaw(
  withFormItem(
    defineComponent({
      name: 'TextWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
        const handleChange = (e: any) => {
          // console.log(e)
          const value = e.target.value
          e.target.value = props.value //controlled-input实现
          props.onChange(value)
        }

        const styleRef = computed(() => {
          return {
            color: (props.options && props.options.color) || 'black',
          }
        })

        return () => {
          const { value } = props

          return (
            <input
              type="text"
              value={value as any}
              onInput={handleChange}
              style={styleRef.value}
            />
          )
        }
      },
    }),
  ),
)

export default TextWidget
