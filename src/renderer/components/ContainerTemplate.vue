<template>
  <div class="container-wrapper">
    <div id="container-title-wrapper" @click="show = !show">
      {{ containerName }}
      <span class="container-state">
        {{ state }}
      </span>
    </div>
    <transition name="fade">
      <div id="container-body" v-show="show">
        Image: {{ imageName }}<br />

        <port v-for="(port, index) in poorten" :port="port" :key="index"></port> <br />

        <process-list :processlist="processlist" v-if="processlist != null"></process-list>

        <button @click="openShell()">open shell</button>
        <button @click="stopContainer()">stop</button>
        <button @click="startContainer()">start</button>
        <button @click="test()">test</button>
      </div>
    </transition>
  </div>
</template>

<script>
    import Port from './ContainerTemplate/Port.vue'
    import ProcessList from './ContainerTemplate/ProcessList.vue'

    export default {
      props: ['container'],
      name: 'container-template',
      components: { Port, ProcessList },
      data () {
        return {
          show: false,
          processlist: null
        }
      },
      methods: {
        test () {
          let el = this

          const Docker = require('node-docker-api').Docker

          const docker = new Docker({ socketPath: '/var/run/docker.sock' })

          docker.container.list()
            .then((containers) => containers.filter(function (obj) { return obj.id === el.container.id })[0])
            .then((container) => container.top())
            .then((processes) => el.setProcessList(processes))
        },
        setProcessList (list) {
          this.processlist = list
        },
        openShell () {
          const { exec } = require('child_process')
          const xte = exec('/usr/bin/x-terminal-emulator -e "docker exec -it ' + this.container.id + ' /bin/bash"', {'shell': true})

          xte.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
          })

          xte.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`)
          })

          xte.on('close', (code) => {
            console.log(`child process exited with code ${code}`)
          })

          // shell.openExternal('https://github.com/kitematic/kitematic/issues/new')
        },
        stopContainer () {
          this.container.stop()
        },
        startContainer () {
          this.container.start()
        }
      },
      computed: {
        poorten () {
          if (this.container.data !== null) {
            return this.container.data.Ports
          }

          return null
        },
        containerName () {
          return this.container.data.Names[0].substring(1)
        },
        imageName () {
          return this.container.data.Image
        },
        state () {
          return this.container.data.State
        }
      }
    }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .container-state {
    right: 5px;
    position: absolute;
  }

  #container-body {
    box-sizing: border-box;
    border-bottom: solid 1px #7a8491;
  }

  .container-wrapper {
    /*border: solid 1px black;*/
    margin: 0;
    padding: 0;
    min-height: 30px;
  }

  #container-title-wrapper {
    cursor: pointer;
    min-height: 30px;
    padding-top: 4px;
    border-bottom: solid 1px #7a8491;
  }

  #container-title-wrapper:hover {
    background-color: #7a8491;
  }
</style>
