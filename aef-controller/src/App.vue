<template>
<div>
  <div class="main" v-if="reset">
      <ChangeableList :pycomm="pycomm" type="button"/>
      <ChangeableList :pycomm="pycomm" type="encoder"/>
  </div>
  <Buttons :pycomm="pycomm" :itemsJson="pycomm.commands" />
</div>
</template>

<script>
import ChangeableList from './components/ChangableList.vue'
import Buttons from './components/Buttons.vue'
import common from './common.js'
import pycomm from './pycomm.js'

export default {
  name: 'App',
  components: {
    ChangeableList,
    Buttons
  },
  mounted() {
    this.pycomm.init(this)
    setTimeout(() => {
      console.log("Re render")
      this.reset = false;
      console.log(this.pycomm.inputs)
      this.$nextTick(() => {
          // Add the component back in
          this.reset = true;
        });
    }, 2500)
  },
  data() {
    return {
      pycomm: pycomm,
      common: common,
      json: {},
      reset: true
    }
  },
  sockets: {
    news(msg) {
      this.json = msg
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
  color:lightcyan;
  background: slategrey;
}
.custom-button {
  background: maroon;
  color: antiquewhite;
  border: solid blue 1px;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  user-select: none; /* Standard */
}
.custom-button:active {
  background: blue;
}
</style>
