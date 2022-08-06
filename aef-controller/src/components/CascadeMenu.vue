<template>
  <div>
    <div class="dropdown-container">
        <select name="devices" id="devices" class="fake-dropdown" v-model="value" @change="change(name, value)">
            <optgroup v-for="(commands, commandType) in filterItems(itemsJson)" :key="commandType" :label="prettyName(commandType)">
                    <option v-for="(sub, command) in filterCommands(commands)" :value="command" :key="command" :selected="value==command">
                        {{prettyName(command)}}
                    </option>
            </optgroup>
        </select>
    </div>
  </div>
</template>

<script>
import common from "../common.js"

export default {
  name: 'CascadeMenu',
  props: {
    itemsJson: {},
    type: "",
    value: "",
    name: "",
    pycomm: "",
  },
  components: {
  },
  data() {
      return {
          defaultValue: "Select",
          show: false,
          prettyName: common.prettyName,
      }
  },
  mounted() {
      console.log(this.itemsJson)
  },
  methods: {
        enter: function () {
            this.show = true;
        },
        leave: function () {
            this.show = false;
        },
        filterItems: function(types) {
            let self = this
            return Object.fromEntries(Object.entries(types).
                filter(([key, val]) => Object.keys(self.filterCommands(val)).length > 0));
        },
        filterCommands: function(commands) {
            let self = this
            return Object.fromEntries(Object.entries(commands).
                filter(([key, val]) => val['input_type'] == self.type));
        },
        change(name, value) {
            console.log(this.pycomm.inputs)
            this.pycomm.change(name, value)
        }
  }
}
</script>

<style scoped>

.cascade-container {
      background: lightgrey;
}
.fake-dropdown {
    background: transparent;
    color: lightcoral;
}
.font-12 {
    font-size: 12px;
}
.dropdown-container {
    display: flex;
    flex-direction: column;
    justify-content:flex-start; 
}

</style>
