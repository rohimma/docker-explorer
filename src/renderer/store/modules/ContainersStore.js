/**
 * Created by maikel on 29-6-17.
 */

const Docker = require('node-docker-api').Docker
let docker = new Docker({ socketPath: '/var/run/docker.sock' })

const state = {
  containerList: null,
  isRunning: false
}

const mutations = {
  set_container_list (state, containerList) {
    console.log('updating list')
    state.containerList = containerList
  },
  set_container_list_running (state, isRunning) {
    state.isRunning = isRunning
  }
}

const actions = {
  updateAsync ({ commit, state, dispatch }, force = false) {
    if (state.isRunning === false || force) {
      commit('set_container_list_running', true)

      docker.container.list({all: true})
        .then((containers) => {
          commit('set_container_list', containers)
        })

      setTimeout(() => {
        dispatch('updateAsync', true)
      }, 1000)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
