import * as types from './types'
import actions from './actions'

export const state = {
  categoryResponse: [],
}

export const mutations = {
  [types.SET_CATEGORY_RESPONSE](state, categoryResponse) {
    state.categoryResponse = categoryResponse
  },
}

const getters = {
  getCategoryResponse: (state) => state.categoryResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
