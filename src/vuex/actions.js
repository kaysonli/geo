export const addDevice = ({ dispatch }) => {
  dispatch('ADD_DEVICE')
}

export const loadDevices = ({ dispatch }, items) => {
  dispatch('LOAD_DEVICES', items)
}

export const deleteDevice = ({ dispatch }, index) => {
  dispatch('DELETE_DEVICE', index)
}

export const updateActiveDevice = ({ dispatch }, device) => {
  dispatch('SET_ACTIVE_DEVICE', device)
}

