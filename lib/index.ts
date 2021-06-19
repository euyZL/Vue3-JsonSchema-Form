/*
 * @Author: your name
 * @Date: 2021-06-05 23:22:38
 * @LastEditTime: 2021-06-10 23:53:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\lib\index.tsx
 */
import SchemaForm from './SchemaForm'
import NumberField from './Fields/NumberField'
import StringField from './Fields/StringField'
import ArrayField from './Fields/ArrayField'
import ObjectField from './Fields/ObjectField'
import ThemeProvider from './theme'
import SelectionWidget from './theme-default/SelectionWidget'

export default SchemaForm

export {
  NumberField,
  StringField,
  ArrayField,
  ObjectField,
  ThemeProvider,
  SelectionWidget,
}
