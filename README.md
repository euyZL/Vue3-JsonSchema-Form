<!--
 * @Author: your name
 * @Date: 2021-05-28 17:30:31
 * @LastEditTime: 2021-06-10 21:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\README.md
-->

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

# vue3-json-schema-form

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
