/*
 * @Author: your name
 * @Date: 2021-05-30 16:48:19
 * @LastEditTime: 2021-05-30 17:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\schema-tests\tests.js
 */
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)
ajv.addKeyword('test', {
  validate(schema, data) {
    console.log(schema, data)
    if (schema === true) {
      return true
    } else {
      return schema.length === 6
    }
  },
})
const schema = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' },
    name: {
      type: 'string',
      minLength: 10,
      //   test: false,
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
    },
  },
  required: ['foo'],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

const data = {
  foo: 1,
  bar: 'abc',
  name: 'hahahahaha',
}

const valid = validate(data)
if (!valid) {
  console.log(validate.errors)
} else {
  console.log('success')
}
