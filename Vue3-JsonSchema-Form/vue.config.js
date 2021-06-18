/*
 * @Author: your name
 * @Date: 2021-06-06 22:14:24
 * @LastEditTime: 2021-06-09 21:49:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\vue.config.js
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
