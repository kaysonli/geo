import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  devices: [],
  activeDevice: {}
}

const mutations = {
  ADD_DEVICE (state, device) {
    state.devices.push(device)
    state.activeDevice = device
  },

  LOAD_DEVICES (state, items) {
    state.devices = items;
    state.activeDevice = items[0];
  },

  DELETE_DEVICE (state, index) {
    var deviceToRemove = state.devices[index];
    state.devices.$remove(deviceToRemove)
  },

  SET_ACTIVE_DEVICE (state, device) {
    state.activeDevice = device
  }
}

export default new Vuex.Store({
  state,
  mutations
})
