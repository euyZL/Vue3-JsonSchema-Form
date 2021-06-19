<!--
 * @Author: your name
 * @Date: 2021-05-28 17:30:31
 * @LastEditTime: 2021-06-19 17:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\README.md
-->

# vue3-json-schema-form

本项目的目的在于使用可视化表单组件生成对应的 Json 表单验证代码，以方便使用者进行表单的 Json 数据校 验，并提供一定程度的自定义和插件化，具有良好的组件化和可维护性。实现方面使用 Vue3+TS 进行开发，展示的代码编辑器使用微软开源的 MonacoEditor，表单 Json 格式使用 Json-Schema，使用 Ajv 校验 Json-Schema。

# API 设计

## APP

```js
demo:{
  //校验格式
  schema: Schema | null

  //校验数据
  data: any

  //自定义表单UI组件
  uiSchema: UISchema | null

  //自定义校验函数
  customValidate: ((d: any, e: any) => void) | undefined

  //相应数据转换成的Json格式数据
  schemaCode: string
  dataCode: string
  uiSchemaCode: string
}
```

```jsx
<MonacoEditor
  //用于显示的JSON数据
  code={demo.Code}

  title={'Schema'}
  onChange={handleSchemaChange}
  class={classes.codePanel}
/>

//整体结构
<ThemeProvider
  theme={themeDefault}>
  <SchemaForm>
    <SchemaItem>
      <Field>
        <WrappedWidget>
          <ErrorSchema/>
          <Widget/>
        </WrappedWidget>
      </Field>
    </SchemaItem>
  </SchemaForm>
</ThemeProvider>

//提供不同Theme的Widgets到SchemaForm
<ThemeProvider
  theme={themeDefault}>
  {slots}
</ThemeProvider>

<SchemaForm
  schema={demo.schema}
  value={demo.data}
  onChange={handleChange}
  uiSchema={demo.uiSchema}
  contextRef={contextRef}               //校验
  customValidate={demo.customValidate}  //自定义校验函数
  customFormat={customFormat}           //addFormat和自定义的对应表单校验组件
  customKeyword={customKeyword}         //自定义关键字
/>

<SchemaItem
  schema={schema}
  value={value}
  onChange={handleChange}
  rootSchema={schema}
  errorSchema={errorSchemaRef.value || {}}
  uiSchema={uiSchema || {}}
/>

<Field
  schema={retrieveSchema(schema, rootSchema, value)}  //避免如Object和Array的循环依赖
  value={value}
  onChange={handleChange}
  rootSchema={schema}
  errorSchema={errorSchemaRef.value || {}}
  uiSchema={uiSchema || {}}
/>

<WrappedWidget
  schema={schema}
  value={value}
  errors={errorSchema.__errors}           //校验结果的错误信息
  onChange={handleChange}
  options={widgetOptionsRef.value}        //用于SelectionWidget
/>

<ErrorSchema>
  {errors}
</ErrorSchema>

<Widget
  schema={schema}
  value={value}
  onChange={handleChange}
  options={widgetOptionsRef.value}        //用于SelectionWidget
/>
```

### schema

json schema 对象，用来定义数据，也是定义表单的依据

### value

从最顶层传下表单展示的数据

### onChange

从最顶层传下的表单相应的 input 事件调用函数

### contextRef

由顶层传入其它层的组件 Ref

### uiSchema

用于描述 UI 的 schema

## 自定义 UISchema

示例为 components/PasswordWidget.tsx

## Plugins

### customFormat

示例为 plugins/customFormat.tsx

### customKeyword

示例为 plugins/customKeyword.tsx

## Project setup

Composition API

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
