/*
 * @Author: your name
 * @Date: 2021-06-07 01:13:03
 * @LastEditTime: 2021-06-17 00:21:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\Fields\ArrayField.tsx
 */
import { defineComponent, PropType } from 'vue'
import { FieldPropsDefine, Schema, SelectionWidgetNames } from '../types'
import { useContext } from '../context'
import { createUseStyles } from 'vue-jss'
import { getWidget } from '../theme'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '&+&': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    index: {
      type: Number,
      required: true,
    },
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDown = () => props.onDown(props.index)

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

/**
 * 单类型数组 single-type
 * {
 *   items: { type: string }
 * }
 *
 * 固定长度，多类型数组 fixed length & multi-type
 * {
 *   items: [
 *     { type: number }
 *   ]
 * }
 *
 * 多选类型数组 multi-select
 * {
 *   items: { type: string, enum: ['1', '2']}
 * }
 */

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useContext()
    // const SelectionWidget = context.theme.widgets.SelectionWidget

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      console.log(value)
      arr[index] = v
      props.onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }

    const handleUp = (index: number) => {
      if (index === 0) return

      const { value } = props
      const arr = Array.isArray(value) ? value : []

      const item = arr.splice(index, 1)[0]
      arr.splice(index - 1, 0, item)

      props.onChange(arr)
    }

    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      if (index === arr.length - 1) return
      const item = arr.splice(index, 1)[0]
      arr.splice(index + 1, 0, item)

      props.onChange(arr)
    }

    /**
     * getWidget
     */
    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      //利用context避免循环调用FormItem组件
      const SchemaItem = context.SchemaItem
      const SelectionWidget = SelectionWidgetRef.value
      const isMultiType = Array.isArray(schema.items)
      //判断是否有enum
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any

        const valueArray = Array.isArray(value) ? value : []

        return items.map((s: Schema, index: number) => {
          const uiSchemaItems = uiSchema.items
          const uiSchemaItem = Array.isArray(uiSchemaItems)
            ? uiSchemaItems[index] || {}
            : {}

          return (
            <SchemaItem
              schema={s}
              rootSchema={rootSchema}
              value={valueArray[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
              key={index}
              errorSchema={errorSchema[index] || {}}
              uiSchema={uiSchemaItem}
            />
          )
        })
      } else if (!isSelect) {
        //单类型数组
        const itemArray = Array.isArray(value) ? value : []
        return itemArray.map((v: any, index: number) => (
          <ArrayItemWrapper
            index={index}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              schema={schema.items as Schema}
              rootSchema={rootSchema}
              value={v}
              onChange={(v: any) => handleArrayItemChange(v, index)}
              key={index}
              errorSchema={errorSchema[index] || {}}
              uiSchema={(uiSchema.items as any) || {}}
            />
          </ArrayItemWrapper>
        ))
      } else if (isSelect) {
        //多选数组类型
        // const itemArray = Array.isArray(value) ? value : []
        const options = (schema as any).items.enum.map((e: any) => ({
          key: e,
          value: e,
        }))
        // const options = [
        //   {
        //     key: 'Jojo',
        //     value: '1',
        //   },
        //   {
        //     key: 'Dio',
        //     value: '2',
        //   },
        // ]
        return (
          <SelectionWidget
            schema={schema}
            value={value}
            onChange={props.onChange}
            options={options}
            errors={errorSchema.__errors as any}
          />
        )
      }

      return null
    }
  },
})
