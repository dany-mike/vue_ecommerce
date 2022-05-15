import * as types from './types'
import actions from './actions'

export const state = {
  categories: [],
}

export const mutations = {
  [types.SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
}

const getters = {
  getCategoryResponse: (state) => state.categories,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
