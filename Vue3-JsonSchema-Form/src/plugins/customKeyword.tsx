/*
 * @Author: your name
 * @Date: 2021-06-17 00:58:50
 * @LastEditTime: 2021-06-17 01:07:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\plugins\customKeyword.tsx
 */
import { CustomKeyword } from '../../lib/types'

const keyword: CustomKeyword = {
  name: 'test',
  definition: {
    macro: () => {
      return {
        minLength: 10,
      }
    },
  },
  transformSchema(schema) {
    return {
      ...schema,
      minLength: 10,
    }
  },
}

export default keyword
