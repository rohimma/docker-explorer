<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">Docker-explorer</router-link>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li class="navbar-text hidden-xs"><span class="badge bg-success" title="containers running">{{ containerListCount }}</span></li>
            <li><router-link to="/settings">Settings</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'docker-explorer',
    computed: {
      containerListCount () {
        if (this.$store.state.DockerStore.containerList === null) {
          return '???'
        }

        return this.$store.state.DockerStore.containerList.length
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
