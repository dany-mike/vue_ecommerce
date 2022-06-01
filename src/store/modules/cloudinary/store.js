import * as types from './types'
import actions from './actions'

export const state = {
  imagesResponse: [],
  imagePayload: null,
}

export const mutations = {
  [types.SET_IMAGE_RESPONSE](state, imagesResponse) {
    state.imagesResponse = imagesResponse
  },
  [types.SET_IMAGE_PAYLOAD](state, imagePayload) {
    state.imagePayload = imagePayload
  },
}

const getters = {
  getImages: (state) => state.imagesResponse,
  getImagePayload: (state) => state.imagePayload,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
