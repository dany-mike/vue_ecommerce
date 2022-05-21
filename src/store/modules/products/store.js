import * as types from './types'
import actions from './actions'

export const state = {
  productResponse: [],
}

export const mutations = {
  [types.SET_PRODUCT_RESPONSE](state, productResponse) {
    state.productResponse = productResponse
  },
}

const getters = {
  getProductResponse: (state) => state.productResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
