<template>
    <div class="well well-sm">
        <div class="row">
            <div class="col-md-1 col-sm-2 col-xs-3">ip</div>
            <div class="col-md-11 col-sm-10 col-xs-9">{{ port.IP }}</div>
        </div>
        <div class="row">
            <div class="col-md-1 col-sm-2 col-xs-3">PrivatePort</div>
            <div class="col-md-11 col-sm-10 col-xs-9">{{ port.PrivatePort }}</div>
        </div>
        <div class="row">
            <div class="col-md-1 col-sm-2 col-xs-3">PublicPort</div>
            <div class="col-md-11 col-sm-10 col-xs-9">{{ port.PublicPort }}</div>
        </div>
        <div class="row">
            <div class="col-md-1 col-sm-2 col-xs-3">Type</div>
            <div class="col-md-11 col-sm-10 col-xs-9">{{ port.Type }}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'port',
    props: ['port']
  }
</script>

<style>
    .port-wrapper {
        border: solid 1px #c2c2c2;
        width: 200px;
        display: inline-block;
    }
</style>
