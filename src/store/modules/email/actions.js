import axios from 'axios'
import * as types from './types'

export default {
  // [types.SEND_INVOICE]({ commit }) {
  //   return axios
  //   .post(`${process.env.VUE_APP_API_BASE_URL}/auth/signin`, body)
  //   .then((response) => {
  //     commit(types.SET_TOKEN, response.data)
  //   })
  //   .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  // },
  [types.SEND_RESET_LINK]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/email/reset-link`, body)
      .then((response) => {
        commit(types.SET_SEND_RESET_LINK, response.data)
      })
      .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  },
  [types.CLEAR_ERROR_RESPONSE]({ commit }) {
    commit(types.SET_CLEAR_ERROR_RESPONSE)
  },
}
