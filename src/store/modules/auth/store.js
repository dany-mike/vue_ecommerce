import * as types from './types'
import actions from './actions'

export const state = {
  currentUser: null,
  errorResponse: null,
  dbUser: null,
  authResponse: null,
  passwordErrRes: null,
  resetPassword: {},
}

export const mutations = {
  [types.SET_TOKEN](state, authResponse) {
    if (authResponse.accessToken) {
      localStorage.setItem('user', JSON.stringify(authResponse))
    }
  },
  [types.SET_AUTH_RESPONSE](state, authResponse) {
    state.authResponse = authResponse
  },
  [types.SET_CURRENT_USER](state, user) {
    if (user && user.accessToken) {
      state.currentUser = user
    }
  },
  [types.SET_ERROR_RESPONSE](state, errorResponse) {
    state.errorResponse = errorResponse
  },
  [types.SET_DB_USER](state, dbUser) {
    state.dbUser = dbUser
  },
  [types.SET_PASSWORD_ERROR_RESPONSE](state, errorResponse) {
    state.passwordErrRes = errorResponse
  },
  [types.SET_CLEAR_PASSWORD_ERROR_MESSAGE](state) {
    state.passwordErrRes = null
    state.errorResponse = null
  },
  [types.SET_CLEAR_USER](state) {
    state.currentUser = null
  },
  [types.SET_RESET_PASSWORD](state, resetPassword) {
    state.resetPassword = resetPassword
  },
  [types.SET_CLEAR_AUTH_RES](state) {
    state.authResponse = null
  },
}

const getters = {
  getCurrentUser: (state) => state.currentUser,
  getErrorResponse: (state) => state.errorResponse,
  getDbUser: (state) => state.dbUser,
  getAuthResponse: (state) => state.authResponse,
  getPasswordErrRes: (state) => state.passwordErrRes,
  getResetPassword: (state) => state.resetPassword,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
