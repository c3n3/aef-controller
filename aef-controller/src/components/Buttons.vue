<template>
  <div>
    NOT WORKING
    <div class="buttons-container">
        <div class="custom-button" @click="show=!show"> {{show ? "Hide" : "Show" }} buttons </div>
        <div v-if="show" name="devices" id="devices" class="command-type">
            <div v-for="(commands, commandType) in filterItems(itemsJson)" :key="commandType" :label="prettyName(commandType)">
                {{prettyName(commandType)}}
                <div class="custom-button" v-for="(sub, command) in filterCommands(commands)" @click="clicked(command)">
                    {{prettyName(command)}}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import common from "../common.js"

export default {
  name: 'Buttons',
  props: {
    itemsJson: {},
    value: "",
    name: "",
    pycomm: "",
  },
  components: {
      },
  data() {
      return {
          type: "button",
          show: false,
          prettyName: common.prettyName,
      }
  },
  mounted() {
      console.log(this.itemsJson)
  },
  methods: {
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
    clicked: function(button) {
        console.log(button)
    }
  }
}
</script>

<style scoped>
.command-type {
    display: flex;
    flex-direction: row;
}
.buttons-container {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    border-top: black 1px solid;
    margin-bottom: black 1px solid;
    padding: 10px;
}
</style>
