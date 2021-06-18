/*
 * @Author: your name
 * @Date: 2021-06-16 23:57:27
 * @LastEditTime: 2021-06-17 13:39:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\plugins\customFormat.tsx
 */
import { CustomFormat } from 'lib/types'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'
import { defineComponent, computed, markRaw } from 'vue'

const Format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
        const handleChange = (e: any) => {
          // console.log(e)
          const value = e.target.value
          e.target.value = props.value //controlled-input实现
          props.onChange(value)
        }

        return () => {
          const { value } = props

          return (
            <input type="color" value={value as any} onInput={handleChange} />
          )
        }
      },
    }),
  ),
}

export default Format
