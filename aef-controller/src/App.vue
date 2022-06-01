<template>
  <div class="main">
      <ChangeableList type="button" :inputs="inputs"/>
      <ChangeableList type="encoder" :inputs="inputs"/>
  </div>
</template>

<script>
import ChangeableList from './components/ChangableList.vue'
import inputjson from './input.json'

export default {
  name: 'App',
  components: {
    ChangeableList
  },
  data() {
    return {
      inputs: inputjson
    }
  },
}
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
.main {
  display: flex;
  flex-direction: row;
}
</style>
