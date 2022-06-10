<template>
<div>
  <div class="main" v-if="reset">
      <ChangeableList :zmq="zmq" type="button" :inputs="zmq.inputs"/>
      <ChangeableList :zmq="zmq" type="encoder" :inputs="zmq.inputs"/>
  </div>
  <Buttons :zmq="zmq" :itemsJson="zmq.commands" />
</div>
</template>

<script>
import ChangeableList from './components/ChangableList.vue'
import Buttons from './components/Buttons.vue'
import functions from './functions.js'

export default {
  name: 'App',
  components: {
    ChangeableList,
    Buttons
  },
  mounted() {
    this.zmq.init(this)
    setTimeout(() => {
      console.log("Re render")
      this.reset = false;
      console.log(this.zmq.inputs)
      this.$nextTick(() => {
          // Add the component back in
          this.reset = true;
        });
    }, 2500)
  },
  data() {
    return {
      zmq: functions,
      functions: functions,
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
