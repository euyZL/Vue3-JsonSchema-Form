/*
 * @Author: your name
 * @Date: 2021-06-05 17:14:44
 * @LastEditTime: 2021-06-06 23:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\components\MonacoEditor.tsx
 */
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  shallowRef,
  onBeforeMount,
  PropType,
} from 'vue'
import * as Monaco from 'monaco-editor'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void //这里可能有问题
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const editorRef = shallowRef()
    const containerRef = ref()
    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))
      _subscription = editor.onDidChangeModelContent((event) => {
        console.log('-------->', __prevent_trigger_change_event)
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeMount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __prevent_trigger_change_event = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          __prevent_trigger_change_event = false
        }
      },
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
