/*
 * @Author: your name
 * @Date: 2021-06-15 19:27:09
 * @LastEditTime: 2021-06-17 14:58:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\theme-default\FormItem.tsx
 */
import { defineComponent, markRaw, shallowRef } from 'vue'
import { ErrorSchema } from 'lib/validator'
import { CommonWidgetPropsDefine } from '../types'
import { createUseStyles } from 'vue-jss'

const classesRef = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: '12',
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classes = classesRef().value

    return () => {
      const { errors, schema } = props
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => {
              return <li>{err}</li>
            })}
          </ul>
        </div>
      )
    }
  },
})

export default FormItem

//HOC Higher Order Component 高阶组件
export function withFormItem(widget: any) {
  return defineComponent({
    name: `Wrapped${widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <widget {...props} {...attrs}></widget>
          </FormItem>
        )
      }
    },
  }) as any
}
