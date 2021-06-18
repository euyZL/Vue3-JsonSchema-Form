/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:07
 * @LastEditTime: 2021-06-05 18:46:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\main.ts
 */
import { createApp } from 'vue'
import App from './App'
// const App = defineComponent({
//   setup() {
//     return () => {
//         return h('div', { id: 'app' }, [
//           h('img', {
//             alt: 'Vue logo',
//             src: img,
//           }),
//           h(HelloWorld, {
//             msg: 'Welcome to Your Vue.js + TypeScript App',
//             age: 12,
//           }),
//           h('p', [
//             'Welcome to Your Vue.js + TypeScript App',
//             '123343545',
//             '000000000',
//           ]),
//         ])
//     }
//   },
//   //   render() {
//   //     return h('div', { id: 'app' }, [
//   //       h('img', {
//   //         alt: 'Vue logo',
//   //         src: img,
//   //       }),
//   //       h(HelloWorld, {
//   //         msg: 'Welcome to Your Vue.js + TypeScript App',
//   //         age: 12,
//   //       }),
//   //     ])
//   //   },
// })
createApp(App).mount('#app')
