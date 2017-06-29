<template>
    <div class="processlist-wrapper">
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="(title, index) in processlist.Titles">{{ title }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(process, index) in processlist.Processes" :key="index">
                <td v-for="(name, index) in process">{{ name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'process-list',
    props: ['processlist']
  }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    .processlist-wrapper td {
        padding: 5px !important;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }
</style>
