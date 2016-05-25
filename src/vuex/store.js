import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false,
  devices: [],
  activeDevice: {},
  gpsReady: false
}

const mutations = {
  ADD_DEVICE(state, device) {
    state.devices.push(device)
    state.activeDevice = device
  },

  LOAD_DEVICES(state, items) {
    state.devices = items;
    state.activeDevice = items[0];
  },

  DELETE_DEVICE(state, device) {
    state.devices.$remove(device)
  },

  SET_ACTIVE_DEVICE(state, device) {
    state.activeDevice = device
  },

  UPDATE_GPS(state, gpsOfDevices) {
    var devMap = {};
    gpsOfDevices.forEach(function(gps) {
      devMap[gps.devId] = gps;
    });
    state.devices.forEach(function(dev) {
      dev.gps = devMap[dev.id];
    });
    state.gpsReady = true;
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export default new Vuex.Store({
  state,
  mutations
})