<!--
 * @Author: your name
 * @Date: 2021-05-28 17:30:31
 * @LastEditTime: 2021-06-10 21:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\README.md
-->
# vue3-json-schema-form

本项目的目的在于使用可视化表单组件生成对应的Json表单验证代码，以方便使用者进行表单的Json数据校
验，并提供一定程度的自定义和插件化，具有良好的组件化和可维护性。实现方面使用Vue3+TS进行开发，展示的代码编
辑器使用微软开源的MonacoEditor，表单Json数据规则生成和校验使用JsonSchema。

# API 设计

```jsx
<JsonSchemaForm
  schema={schema}
  value={value}
  onChange={handleChange}
  locale={locale}
  contextRef={someRef}
  uiSchema={uiSchema}
/>
```

### schema

json schema 对象，用来定义数据，也是定义表单的依据

### value

从最顶层传下表单展示的数据

### onChange

从最顶层传下的表单相应的 input 事件调用函数

### locale

语言

### contextRef

由顶层传入其它层的组件 Ref

### uiSchema

用于描述 UI 的 schema

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
