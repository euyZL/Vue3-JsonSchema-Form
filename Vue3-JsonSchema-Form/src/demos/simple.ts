/*
 * @Author: your name
 * @Date: 2021-06-05 22:10:23
 * @LastEditTime: 2021-06-15 23:21:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\demos\simple.ts
 */
export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck',
        title: 'firstName',
        minLength: 10,
      },
      lastName: {
        type: 'string',
        title: 'lastName',
      },
      telephone: {
        type: 'string',
        minLength: 10,
        title: 'telephone',
      },
      staticArray: {
        type: 'array',
        items: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
      },
      multiTypeArray: {
        type: 'array',
        items: [
          { type: 'string', title: 'string' },
          { type: 'number', title: 'number' },
        ],
        title: 'multiTypeArray',
      },
      singleTypeArray: {
        type: 'array',
        title: 'singleTypeArray',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', title: 'name' },
            age: { type: 'number', title: 'age' },
          },
        },
      },
      multiSelectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'foobar'],
        },
        title: 'multiSelectArray',
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: [{ name: 'cwy', age: 28 }],
  },
}
