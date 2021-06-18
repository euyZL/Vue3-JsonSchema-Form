/*
 * @Author: your name
 * @Date: 2021-06-15 00:46:22
 * @LastEditTime: 2021-06-16 01:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\Validate.ts
 */
import Ajv, { ErrorObject } from 'ajv'
import toPath from 'lodash.topath'
import { Schema } from './types'
// import i18n from 'ajv-i18n'
import { isObject } from './utils'
const i18n = require('ajv-i18n') //eslint-disable-line

interface TransformedErrorsObject {
  name: string
  property: string
  message: string | undefined
  params: any
  schemaPath: string
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}

function toErrorSchema(errors: TransformedErrorsObject[]) {
  if (errors.length < 1) return {}
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    const path = toPath(property)
    let parent = errorSchema

    //如果property是在根key（.level1）下，那toPath会创建在数组头创建一个空对象
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    //递归地去由数组生成对象
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): TransformedErrorsObject[] {
  if (errors === null || errors === undefined) {
    return []
  }
  return errors.map(({ message, dataPath, keyword, params, schemaPath }) => {
    return {
      name: keyword,
      property: `${dataPath}`,
      schemaPath,
      params,
      message,
    }
  })
}

export async function validateFromData(
  validator: Ajv.Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh',
  customValidate?: (data: any, errors: any) => void,
) {
  let validateErrors = null
  try {
    validator.validate(schema, formData)
  } catch (err) {
    validateErrors = err
  }

  i18n[locale](validator.errors)
  // validator.errors?.forEach((item) => {
  //   i18n['zh'](item)
  // })

  let errors = transformErrors(validator.errors)

  if (validateErrors) {
    errors = [
      ...errors,
      { message: (validateErrors as any).message } as TransformedErrorsObject,
    ]
  }

  const errorSchema = toErrorSchema(errors)

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    }
  }

  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)
  // const newErrors = toErrorList()
  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0,
  }
}

function createErrorProxy() {
  const raw = {}

  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', reciver)
          if (__errors && Array.isArray(__errors)) {
            ;(target as any).__errors.push(msg)
          } else {
            ;(target as any).__errors = [msg]
          }
        }
      }

      const res = Reflect.get(target, key, reciver)
      //递归判断并添加key
      if (res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }

      return res
    },
  })
}

export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  const accumulator = Object.assign({}, obj1)
  return Object.keys(obj2).reduce((accumulator, key) => {
    const left = obj1 ? obj1[key] : {}
    const right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      //递归返回
      accumulator[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      accumulator[key] = left.concat(right)
    } else {
      accumulator[key] = right
    }
    return accumulator
  }, accumulator)
}
