import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container-list',
      component: require('@/components/ContainerList')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: require('@/components/SettingsPage')
    }
  ]
})
