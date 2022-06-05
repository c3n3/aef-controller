<template>
<div class="list-container-container">
  <h3>{{prettyName(type)}}s</h3>
  <nav class="list-container">
    <div v-for="input, index in zmq.inputs" :key="index" class="list">
      <div v-if="input['type'] == type" class="item">
        <div class="item-name">{{zmq.prettyName(input['name'])}}</div>
        <CascadeMenu :zmq="zmq" :itemsJson="zmq.commands" :value="input['reg_link']" :type="type" :name="input['name']"/>
      </div>
    </div>
  </nav>
</div>
</template>

<script>

import CascadeMenu from './CascadeMenu.vue'
import functions from "../functions.js"

export default {
  name: 'ChangeableList',
  data() {
    return {
    }
  },
  props: {
    type: String,
    zmq: {},
  },
  components: {
    CascadeMenu
  },
  methods: {
    prettyName: functions.prettyName,
    print: function () {
      console.log(this.zmq.inputs)
      console.log(this.zmq.commands)
    }
  },
  watch: {
    'zmq.update' (newVal) {
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.list-container {
  width: 75%;
  margin: 5px;
  height: 80vh;
  display: block;
  overflow:hidden; overflow-y:scroll;
}

.item {
  border: 2px solid lightcyan;
  background:darkblue;
  width: 95%;
  margin: 5px;
}

</style>
