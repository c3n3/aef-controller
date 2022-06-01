<template>
  <nav class="list-container">
    <h3>{{type}}s</h3>
    <div v-for="input, index in inputs" :key="index" class="list">
      <div v-if="input['type'] == type">
        {{input['name']}}
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ChangeableList',
  props: {
    type: String,
    inputs: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list-container {
  width: 50%;
  height: 400px;
  overflow:hidden; overflow-y:scroll;
}


/* nav ul {
  height: 200px;
  width: 18%;
} */
.list {
}
</style>
