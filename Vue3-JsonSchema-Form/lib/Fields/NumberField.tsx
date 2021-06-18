/*
 * @Author: your name
 * @Date: 2021-06-06 21:53:32
 * @LastEditTime: 2021-06-15 19:41:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\Fields\NumberField.tsx
 */
import { defineComponent } from '@vue/runtime-core'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)

    function handleChange(e: any) {
      props.onChange(e)
    }

    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { schema, value, errorSchema } = props
      return (
        <NumberWidget
          schema={schema}
          value={value}
          errors={errorSchema.__errors as any}
          onChange={handleChange}
        />
      )
    }
  },
})
