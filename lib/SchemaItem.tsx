/*
 * @Author: your name
 * @Date: 2021-06-06 00:18:58
 * @LastEditTime: 2021-06-19 19:40:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\SchemaItems.tsx
 */
import { computed, defineComponent } from 'vue'
import { FieldPropsDefine } from './types'

import { retrieveSchema } from './utils'
import { useContext } from './context'
import { Fields } from './index'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    const formContext = useContext()

    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return formContext.transformSchemaRef.value(
        retrieveSchema(schema, rootSchema, value),
      )
    })

    return () => {
      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value
      const type = schema.type
      let Component: any

      if (type && Fields[type]) {
        Component = Fields[type]
      } else {
        console.warn(`${type} is not supported`)
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
