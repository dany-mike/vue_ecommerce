import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.CREATE_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.COMPLETE_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order/complete`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_COMPLETED, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CANCEL_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order/cancel`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_ORDER_SUMMARY]({ commit }, orderId) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/order/summary/i/${orderId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data)
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_USER_ORDERS]({ commit }, token) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/order/c/all/${token}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_USER_ORDERS, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CLEAR_ORDER_DETAILS]({ commit }) {
    commit(types.SET_CLEAR_ORDER_DETAILS)
  },
  [types.PAY_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order/pay`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_ORDER_BY_ID]({ commit }, { orderId, userToken }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/${userToken}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_ITEM, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CLEAR_ORDER_DETAILS]({ commit }) {
    commit(types.SET_CLEAR_ORDER_DETAILS)
  },
}
