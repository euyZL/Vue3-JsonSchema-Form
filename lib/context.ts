/*
 * @Author: your name
 * @Date: 2021-06-06 23:40:13
 * @LastEditTime: 2021-06-17 01:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\context.ts
 */
import { inject, Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine, Schema } from './types'

export const SchemaFormContextKey = Symbol()
export function useContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
        transformSchemaRef: Ref<(schema: Schema) => Schema>
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm should be used!')
  }

  return context
}
