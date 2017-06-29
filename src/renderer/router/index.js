import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container-list-page',
      component: require('@/components/ContainerListPage')
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
