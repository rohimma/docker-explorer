/**
 * Created by maikel on 5-7-17.
 */

const state = {
  dockerEventList: [],
  isRunning: false
}

const mutations = {
  set_docker_event_list (state, dockerEventList) {
    state.dockerEventList = dockerEventList
  },
  set_docker_event_store_running (state, isRunning) {
    state.isRunning = isRunning
  },
  add_docker_event (state, event) {
    state.dockerEventList.push(event)
  }
}

const actions = {
  docker_event ({commit}, event) {
    if (typeof event !== 'undefined') {
      commit('add_docker_event', event)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
