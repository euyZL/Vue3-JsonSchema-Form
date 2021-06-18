/*
 * @Author: your name
 * @Date: 2021-06-05 23:10:42
 * @LastEditTime: 2021-06-17 14:58:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\components\PasswordWidget.tsx
 */
import { defineComponent, markRaw } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

const PasswordWidget = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const v = e.target.value
        e.target.value = props.value
        props.onChange(v)
      }

      return () => {
        const { value } = props
        return (
          <input type="password" value={value as any} onInput={handleChange} />
        )
      }
    },
  }),
)

export default PasswordWidget
