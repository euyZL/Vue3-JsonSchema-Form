import { isObject } from './utils'
import {
  CommonWidgetDefine,
  CommonWidgetPropsDefine,
  FieldPropsDefine,
} from './types'
/*
 * @Author: your name
 * @Date: 2021-06-09 23:58:06
 * @LastEditTime: 2021-06-17 16:15:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\theme.tsx
 */
import {
  computed,
  ComputedRef,
  defineComponent,
  ExtractPropTypes,
  inject,
  PropType,
  provide,
  ref,
  shallowRef,
} from 'vue'
import { Theme, SelectionWidgetNames, CommonWidgetNames } from './types'
import { useContext } from './context'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  },
})

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof FieldPropsDefine>,
) {
  if (props) {
    const { uiSchema, schema } = props
    const formContext = useContext()

    //取出自定义UISchema
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      // return ref(uiSchema.widget as CommonWidgetDefine)
      return shallowRef(uiSchema.widget as CommonWidgetDefine)
    }

    //取出自定义format Component
    if (schema.format) {
      if (formContext.formatMapRef.value[schema.format]) {
        // return ref(formContext.formatMapRef.value[schema.format])
        return shallowRef(formContext.formatMapRef.value[schema.format])
      }
    }
  }

  const context: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context) {
    throw new Error('theme is required')
  }

  // const widgetRef = computed(() => {
  //   return context.value.widgets[name]
  // })

  const widgetRef = shallowRef(context.value.widgets[name])

  // const widgetRef = shallowRef(context.value.widgets[name])

  return widgetRef
}

export default ThemeProvider
