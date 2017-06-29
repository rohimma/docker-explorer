/**
 * Created by maikel on 29-6-17.
 */

const state = {
  containerList: null
}

const mutations = {
  set_container_list (state, containerList) {
    state.containerList = containerList
  }
}
export default {
  state,
  mutations
}
