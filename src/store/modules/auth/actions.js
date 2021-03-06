import { authHeader } from '@/helpers/authHeader'
import axios from 'axios'
import * as types from './types'

export default {
  [types.SIGNIN]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/signin`, body)
      .then((response) => {
        commit(types.SET_TOKEN, response.data)
      })
      .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  },
  [types.SIGNUP]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/signup`, body)
      .then(() => {
        commit(types.SET_ERROR_RESPONSE, false)
      })
      .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  },
  [types.CREATE_ADMIN]({ commit }, formData) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/createAdmin`, formData, {
        headers: authHeader(),
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
  [types.UPDATE_PASSWORD]({ commit }, body) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/auth/password`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_AUTH_RESPONSE, response.data)
      })
      .catch((err) => commit(types.SET_PASSWORD_ERROR_RESPONSE, err.response.data))
  },
  [types.UPDATE_USER_INFO]({ commit }, body) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/auth/`, body, {
        headers: authHeader(),
      })

      .then((response) => {
        commit(types.SET_AUTH_RESPONSE, response.data)
      })
      .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  },
  [types.FETCH_USER_BY_ID]({ commit }, id) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/auth/user/${id}`, {
        headers: authHeader(),
      })

      .then((response) => {
        commit(types.SET_DB_USER, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.RESET_PASSWORD]({ commit }, { body, token }) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/auth/reset-password?token=${token}`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_RESET_PASSWORD, response.data)
      })
      .catch((err) => commit(types.SET_PASSWORD_ERROR_RESPONSE, err.response.data))
  },
  [types.CLEAR_PASSWORD_ERROR_MESSAGE]({ commit }) {
    commit(types.SET_CLEAR_PASSWORD_ERROR_MESSAGE)
  },
  [types.CLEAR_USER]({ commit }) {
    commit(types.SET_CLEAR_USER)
  },
  [types.CLEAR_AUTH_RES]({ commit }) {
    commit(types.SET_CLEAR_AUTH_RES)
  },
}
