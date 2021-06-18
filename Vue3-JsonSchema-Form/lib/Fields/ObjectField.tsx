/*
 * @Author: your name
 * @Date: 2021-06-06 23:06:24
 * @LastEditTime: 2021-06-17 00:21:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\Fields\ObjectField.tsx
 */
import { defineComponent, inject } from 'vue'
import { FieldPropsDefine, UISchema } from '../types'
import { useContext } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    //利用context避免循环调用FormItem组件
    const context = useContext()

    const handleChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      const { SchemaItem } = context
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          value={currentValue[k]}
          onChange={(v: any) => handleChange(k, v)}
          rootSchema={rootSchema}
          key={index}
          errorSchema={errorSchema[k] || {}}
          uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
        />
      ))
    }
  },
})
