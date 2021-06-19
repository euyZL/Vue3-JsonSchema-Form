/*
 * @Author: your name
 * @Date: 2021-06-06 16:37:23
 * @LastEditTime: 2021-06-17 16:29:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\Fields\StringField.tsx
 */
import { defineComponent, computed } from 'vue'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    //需要根据props变化自动调用getWidget并传入
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      console.log(widgetRef)
      return widgetRef.value
    })

    const handleChange = (e: any) => {
      props.onChange(e)
    }

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const TextWidget = TextWidgetRef.value
      const { schema, value, errorSchema } = props

      return (
        <TextWidget
          schema={schema}
          value={value}
          errors={errorSchema.__errors as any}
          onChange={handleChange}
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})
