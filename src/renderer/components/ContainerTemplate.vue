<template>
  <div class="panel panel-default">
    <div class="panel-heading" @click="show = !show">
      {{ containerName }}
      <span class="container-state bg-success">
        <button type="button" class="btn btn-primary btn-play" title="start container" @click="startContainer()"><i class="fa fa-play"></i></button>
        {{ state }}
      </span>
    </div>
    <transition name="fade">
      <div class="panel-body" v-show="show">
        Image: {{ imageName }}<br />

        <port v-for="(port, index) in poorten" :port="port" :key="index"></port> <br />

        <process-list :processlist="processlist" v-if="processlist != null"></process-list>

        <button type="button" class="btn btn-primary" title="open shell" @click="openShell()"><i class="fa fa-external-link"></i></button>
        <button type="button" class="btn btn-primary" title="stop container" @click="stopContainer()"><i class="fa fa-stop"></i></button>
        <button type="button" class="btn btn-primary" title="start container" @click="startContainer()"><i class="fa fa-play"></i></button>
        <button type="button" class="btn btn-primary" title="test" @click="test()">test</button>
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

  .panel {
    margin-bottom: 5px;
    border-radius: 0px;
  }

  .btn-play {
    padding: 1px 5px;
  }
</style>
