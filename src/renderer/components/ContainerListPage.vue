<template>
  <div id="wrapper">
    <container-template v-for="Container in containerList" :container="Container" :key="Container.id"></container-template>
  </div>
</template>

<script>
  import ContainerTemplate from './ContainerTemplate.vue'

  export default {
    name: 'container-list-page',
    components: { ContainerTemplate },
    mounted () {
      this.$store.dispatch('updateAsync')
    },
    computed: {
      containerList () {
        return this.$store.state.DockerStore.containerList
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
</style>
