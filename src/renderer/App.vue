<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
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

          <ul class="nav navbar-nav navbar-left">
            <li><router-link to="/images">Images</router-link></li>
            <li><router-link to="/new">New</router-link></li>
            <!--<li class="dropdown">-->
              <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>-->
              <!--<ul class="dropdown-menu">-->
                <!--<li><a href="#">Action</a></li>-->
                <!--<li><a href="#">Another action</a></li>-->
                <!--<li><a href="#">Something else here</a></li>-->
                <!--<li role="separator" class="divider"></li>-->
                <!--<li><a href="#">Separated link</a></li>-->
              <!--</ul>-->
            <!--</li>-->
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
        if (this.$store.state.ContainersStore.containerList === null) {
          return '???'
        }

        return this.$store.state.ContainersStore.containerList.length
      }
    }
  }
</script>

<style>
  body {
    padding-top: 70px;
  }
</style>
