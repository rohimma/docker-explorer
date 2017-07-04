<template>
    <div class="well well-sm logcontainer">
        <div class="row">
            <div class="" v-for="log in containerLog.slice(Math.max(containerLog.length - 10, 1))" v-html="log"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'container-log',
    props: ['containerLog']
  }
</script>

<style>
  .logcontainer {
      max-height: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-y: scroll;
  }
</style>
