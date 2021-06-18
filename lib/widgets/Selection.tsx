/*
 * @Author: your name
 * @Date: 2021-06-07 23:00:02
 * @LastEditTime: 2021-06-10 22:44:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\widgets\Selection.tsx
 */
import { defineComponent, ref, PropType, watch } from 'vue'
import { SelectionWidgetDefine, SelectionWidgetPropsDefine } from '../types'

const Selection: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (newV, oldV) => {
      if (newV !== props.value) {
        props.onChange(newV)
      }
    })

    watch(
      () => props.value,
      (v) => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      },
    )

    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value} name="">
          {options.map((opt) => (
            <option value={opt.value}>{opt.key}</option>
          ))}
        </select>
      )
    }
  },
})

export default Selection
