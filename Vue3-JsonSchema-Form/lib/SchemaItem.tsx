/*
 * @Author: your name
 * @Date: 2021-06-06 00:18:58
 * @LastEditTime: 2021-06-17 01:25:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\SchemaItems.tsx
 */
import { computed, defineComponent, PropType, shallowRef } from 'vue'
import { Schema, SchemaTypes, FieldPropsDefine } from './types'
import StringField from './Fields/StringField'
import NumberField from './Fields/NumberField'
import ObjectField from './Fields/ObjectField'
import ArrayField from './Fields/ArrayField'

import { retrieveSchema } from './utils'
import { useContext } from './context'

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
      // const retrievedSchemaRef = shallowRef(
      //   retrieveSchema(schema, rootSchema, value),
      // )

      const retrievedSchema = retrievedSchemaRef.value
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
