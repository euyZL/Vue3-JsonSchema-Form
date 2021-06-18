/*
 * @Author: your name
 * @Date: 2021-06-05 17:06:18
 * @LastEditTime: 2021-06-17 16:09:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\App.tsx
 */
import { defineComponent, reactive, ref, Ref, watchEffect, toRaw } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'
import ThemeDefault from '../lib/theme-default'
import ThemeProvider from '../lib/theme'

//测试数据
import demos from './demos'

//导入组件库
import SchemaForm from '../lib'
import themeDefault from '../lib/theme-default'
import customFormat from './plugins/customFormat'
import customKeyword from './plugins/customKeyword'

//在lib中export
type Schema = any
type UISchema = any

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  setup() {
    // const schemaRef: Ref<any> = ref(schema)
    //tab switch
    const selectedRef: Ref<number> = ref(0)

    //实例初始化
    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate: ((d: any, e: any) => void) | undefined
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    })

    // 数据监听，得到demo的当前值
    watchEffect(() => {
      const index = selectedRef.value
      const d: any = demos[index] // 测试数据demos
      console.log(demos[index])
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })

    //css in js
    const classesRef = useStyles()

    // Form的onChange事件
    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
      // console.log(v)
      // console.log(toJson(v))
    }

    //抽象handleChange函数
    function handleCodeChange(
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        const jsonData = JSON.parse(value)
        demo[field] = jsonData(demo as any)[`${field}Code`] = value
        console.log((demo as any)[`${field}Code`])
      } catch (err) {
        console.log(err)
      }
    }

    //函数实例
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    const contextRef = ref() //用于验证
    const nameRef = ref() //获取SchemaForm引用

    function validateForm() {
      contextRef.value.doValidate().then((result: any) => console.log(result))
    }

    return () => {
      const selected = selectedRef.value
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          {''}
          {/* menu */}
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                title={'Schema'}
                onChange={handleSchemaChange}
                class={classes.codePanel}
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  title={'UISchema'}
                  onChange={handleUISchemaChange}
                  class={classes.codePanel}
                />
                <MonacoEditor
                  code={demo.dataCode}
                  title={'Value'}
                  onChange={handleDataChange}
                  class={classes.codePanel}
                />
              </div>
            </div>
            {/* form */}
            <div class={classes.form}>
              <ThemeProvider theme={ThemeDefault}>
                <SchemaForm
                  schema={demo.schema}
                  onChange={handleChange}
                  value={demo.data}
                  contextRef={contextRef}
                  customValidate={demo.customValidate as any}
                  uiSchema={toRaw(demo.uiSchema) || {}}
                  customFormat={customFormat}
                  customKeyword={customKeyword}
                />
              </ThemeProvider>
              {/* <ThemeProvider theme={themeDefault as any}>
                <SchemaForm
                  schema={demo.schema}
                  value={demo.data}
                  onChange={handleChange}
                  contextRef={contextRef}
                  ref={nameRef}
                  customValidate={demo.customValidate}
                  uiSchema={demo.uiSchema || {}}
                  customFormats={customFormat}
                  customKeywords={customKeyword}
                />
              </ThemeProvider> */}
            </div>
            {/* <button onClick={validateForm}>校验</button> */}
            <button onClick={validateForm}>校验</button>
            {/* <button onClick={SchemaForm.doValidate}>校验</button> */}
          </div>
          <a href="#">github</a>
        </div>
      )
    }
  },
})
