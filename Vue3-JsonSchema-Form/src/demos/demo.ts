/*
 * @Author: your name
 * @Date: 2021-06-06 00:46:42
 * @LastEditTime: 2021-06-17 14:40:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\demos\demo.ts
 */
import PasswordWidget from '@/components/PasswordWidget'

export default {
  name: 'Demo',
  schema: {
    // type: 'number',
    // minLength: 5,

    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 6,
        test: true,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 6,
        title: 'retry password',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
    },
  },
  // customValidate(data: any, errors: any) {
  //   if (data.pass1 !== data.pass2) {
  //     console.log('校验')
  //     errors.pass2.addError('密码必须相同')
  //   }
  // },
  async customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 != data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve(true)
      }, 1000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
  default: '1',
}
