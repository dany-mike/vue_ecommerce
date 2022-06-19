import * as types from './types'
import actions from './actions'

export const state = {
  errorResponse: null,
  resetLinkResponse: {},
  invoiceResponse: {},
}

export const mutations = {
  [types.SET_CLEAR_ERROR_RESPONSE](state) {
    state.errorResponse = null
  },
  [types.SET_ERROR_RESPONSE](state, errorResponse) {
    state.errorResponse = errorResponse
  },
  [types.SET_ERROR_RESPONSE](state, errorResponse) {
    state.errorResponse = errorResponse
  },
  [types.SET_SEND_RESET_LINK](state, resetLinkResponse) {
    state.resetLinkResponse = resetLinkResponse
  },
  [types.SET_SEND_INVOICE](state, invoiceResponse) {
    state.invoiceResponse = invoiceResponse
  },
}

const getters = {
  getEmailErrResponse: (state) => state.errorResponse,
  getResetLink: (state) => state.resetLinkResponse,
  getInvoice: (state) => state.invoiceResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
