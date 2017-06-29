<template>
    <div class="port-wrapper">
        ip: {{ port.IP }} <br />
        PrivatePort: {{ port.PrivatePort }} <br />
        PublicPort: {{ port.PublicPort }} <br />
        Type: {{ port.Type }} <br />
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
