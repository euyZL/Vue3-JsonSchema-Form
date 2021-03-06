/*
 * @Author: your name
 * @Date: 2021-06-05 23:22:08
 * @LastEditTime: 2021-06-17 14:47:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\SchemaForm.tsx
 */
import {
  defineComponent,
  PropType,
  provide,
  ref,
  Ref,
  shallowRef,
  watch,
  watchEffect,
  computed,
} from 'vue'
import { Schema, Theme, UISchema, CommonWidgetDefine } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFromData, ErrorSchema } from './validator'
import { CustomFormat } from 'lib/types'
import { CustomKeyword } from './types'

interface contextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    contextRef: {
      type: Object as PropType<Ref<contextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    customFormat: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    customKeyword: {
      type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
    },
  },
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })

      if (props.customFormat) {
        const customFormats = Array.isArray(props.customFormat)
          ? props.customFormat
          : [props.customFormat]
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }

      if (props.customKeyword) {
        const customKeywords = Array.isArray(props.customKeyword)
          ? props.customKeyword
          : [props.customKeyword]
        customKeywords.forEach((keyword) => {
          validatorRef.value.addKeyword(keyword.name, keyword.definition)
        })
      }
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0) //???????????????????????????????????????

    async function doValidate() {
      const index = (validateIndex.value += 1) //????????????????????????????????????
      const result = await validateFromData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      
      if (index !== validateIndex.value) {
        //????????????????????????????????????????????????????????????
        return
      }
      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)

      validateResolveRef.value = undefined
    }

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    //???????????????format??????????????????????????????format???component.name???=component?????????
    const formatMapRef = computed(() => {
      if (props.customFormat) {
        const customFormats = Array.isArray(props.customFormat)
          ? props.customFormat
          : [props.customFormat]
        return customFormats.reduce((result, format) => {
          // validatorRef.value.addFormat(format.name, format.definition)
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      } else {
        return {}
      }
    })

    //???????????????keyword?????????transformSchema???????????????
    const transformSchemaRef = computed(() => {
      if (props.customKeyword) {
        const customKeywords = Array.isArray(props.customKeyword)
          ? props.customKeyword
          : [props.customKeyword]

        return (schema: Schema) => {
          let newSchema = schema
          customKeywords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema)
            }
          })
          return newSchema
        }
      } else {
        return {}
      }
    })

    //??????contxet???provide??????widget
    const context: any = {
      SchemaItem,
      formatMapRef,
      transformSchemaRef,
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          onChange={handleChange}
          value={value}
          errorSchema={errorSchemaRef.value || {}}
          uiSchema={uiSchema || {}}
        />
      )
    }
  },
})
