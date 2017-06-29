<template>
  <div id="wrapper">
    <container-template v-for="Container in containerList" :container="Container" :key="Container.id"></container-template>
  </div>
</template>

<script>
  import ContainerTemplate from './ContainerTemplate.vue'

  const Docker = require('node-docker-api').Docker

  let docker = new Docker({ socketPath: '/var/run/docker.sock' })

  export default {
    name: 'landing-page',
    components: { ContainerTemplate },
    mounted () {
      let el = this

      window.setInterval(function () {
        el.updateContianerList()
      }, 1000)
    },
    data () {
      return {
        containerList: null
      }
    },
    methods: {
      setContainers (containers) {
        this.containerList = containers
      },
      updateContianerList () {
        let el = this

        return docker.container.list()
          .then((containers) => {
            el.setContainers(containers)
          })
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
