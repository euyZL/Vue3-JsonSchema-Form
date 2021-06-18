<!--
 * @Author: your name
 * @Date: 2021-05-28 17:30:07
 * @LastEditTime: 2021-06-05 18:45:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-json-schema-form\src\App.vue
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ state.name }}</p>
    <p>{{ state2.age }}</p>
    <p>{{ nameRef }}:{{ computedNameRef }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watchEffect,
  watch,
} from 'vue'

export default defineComponent({
  name: 'App',
  components: {},
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      name: 'JoJo',
    })
    const state2 = reactive({
      age: 12,
    })
    const nameRef = ref('Jocky')
    setInterval(() => {
      state.name += '1'
      state2.age += 1
      nameRef.value += 1
    }, 5000)

    const computedNameRef = computed(() => {
      return nameRef.value + '2'
    })

    watchEffect(() => {
      console.log(nameRef.value)
    })

    return {
      state,
      state2,
      nameRef,
      computedNameRef,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
