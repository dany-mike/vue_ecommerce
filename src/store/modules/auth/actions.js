import axios from 'axios'
import * as types from './types'

export default {
  [types.SIGNIN]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/signin`, body)
      .then((response) => {
        commit(types.SET_TOKEN, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.SIGNUP]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/signup`, body)
      .then(() => {
        commit(types.SET_PAYLOAD_RESPONSE, false)
      })
      .catch((err) => commit(types.SET_PAYLOAD_RESPONSE, err.response.data))
  },
  [types.CREATE_ADMIN]({ commit }, formData) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/createAdmin`, formData, {
        headers: {},
      })

      .then((response) => {
        commit(types.SET_AUTH_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.GET_CURRENT_USER]({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SET_CURRENT_USER, user)
  },
}
