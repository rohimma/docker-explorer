<template>
  <div class="panel panel-default">
    <div class="panel-heading" @click="show = !show">
      {{ containerName }}
      <span class="container-state">
        <button type="button" class="btn btn-primary btn-small" title="open shell" @click="openShell()" v-if="isRunning"><i class="fa fa-external-link"></i></button>
        <button type="button" class="btn btn-primary btn-small" title="open bash shell" @click="openBashShell()" v-if="isRunning"><i class="fa fa-external-link"></i> Bash</button>
        <span :class="stateClass">{{ state }}</span>
      </span>
    </div>
    <transition name="fade">
      <div class="panel-body" v-show="show">
        Image: {{ imageName }}<br />

        <port v-for="(port, index) in poorten" :port="port" :key="index"></port> <br />

        <process-list :processlist="processlist" v-if="processlist != null"></process-list>

        <log :container-log="containerLog" v-if="containerLog.length > 0"></log>

        <button type="button" class="btn btn-primary" title="open shell" @click="openShell()" v-if="isRunning"><i class="fa fa-external-link"></i></button>
        <button type="button" class="btn btn-primary" title="open bash shell" @click="openBashShell()" v-if="isRunning"><i class="fa fa-external-link"></i> Bash</button>
        <button type="button" class="btn btn-danger" title="stop container" @click="stopContainer()" v-if="isRunning"><i class="fa fa-stop"></i></button>
        <button type="button" class="btn btn-info" title="start container" @click="startContainer()" v-if="!isRunning"><i class="fa fa-play"></i></button>
        <button type="button" class="btn btn-primary" title="test" @click="showProcessesList()">showProccessList</button>
        <button type="button" class="btn btn-primary" title="test" @click="getContainerLog()">getContainerLog</button>
      </div>
    </transition>
  </div>
</template>

<script>
    import Port from './ContainerTemplate/Port.vue'
    import ProcessList from './ContainerTemplate/ProcessList.vue'
    import Log from './ContainerTemplate/Log.vue'

    export default {
      props: ['container'],
      name: 'container-template',
      components: { Port, ProcessList, Log },
      data () {
        return {
          show: false,
          processlist: null,
          containerLog: []
        }
      },
      methods: {
        showProcessesList () {
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
        _openShell (arg = '') {
          const { exec } = require('child_process')
          const xte = exec('/usr/bin/x-terminal-emulator -e "docker exec -it ' + this.container.id + ' ' + arg + '"', {'shell': true})

          xte.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
          })

          xte.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`)
          })

          xte.on('close', (code) => {
            console.log(`child process exited with code ${code}`)
          })
        },
        openBashShell () {
          this._openShell('/bin/bash')
        },
        openShell () {
          this._openShell()

          // shell.openExternal('https://github.com/kitematic/kitematic/issues/new')
        },
        stopContainer () {
          this.container.stop()
        },
        startContainer () {
          this.container.start()
        },
        setContainerLog (log) {
          this.containerLog.push(log)
        },
        getContainerLog () {
          let el = this

          const Docker = require('node-docker-api').Docker

          const docker = new Docker({ socketPath: '/var/run/docker.sock' })

          docker.container.list()
            .then((containers) => containers.filter(function (obj) { return obj.id === el.container.id })[0])
            .then((container) => container.logs({
              follow: true,
              stdout: true,
              stderr: true
            }))
            .then((stream) => {
              stream.on('data', (info) => el.setContainerLog(info.toString('utf8')))
              stream.on('error', (err) => console.log('error', err))
            })
            .catch((error) => console.log('stop', error))
        }
      },
      computed: {
        isRunning () {
          return this.state.toLowerCase() === 'running'
        },
        stateClass () {
          switch (this.state.toLowerCase()) {
            case 'running':
              return { 'bg-success': true }
            case 'exited':
              return { 'bg-warning': true }
            default:
              return { 'bg-danger': true }
          }
        },
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

  .btn-small {
    padding: 1px 5px;
  }
</style>
