import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.CREATE_BILLING_ADDRESS]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/address/billing`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CREATE_SHIPPING_ADDRESS]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/address/shipping`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_USER_BILLING_ADDRESSES]({ commit }, userId) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/address/billing/${userId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_USER_BILLING_ADDRESSES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_USER_SHIPPING_ADDRESSES]({ commit }, userId) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/address/shipping/${userId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_USER_SHIPPING_ADDRESSES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_BILLING_ADDRESS]({ commit }, { userId, addressId }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/address/billing/${userId}/${addressId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_ITEM, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_SHIPPING_ADDRESS]({ commit }, { userId, addressId }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/address/shipping/${userId}/${addressId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_ITEM, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.UPDATE_BILLING_ADDRESS]({ commit }, { body, id }) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/address/billing/${id}`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.UPDATE_SHIPPING_ADDRESS]({ commit }, { body, id }) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/address/shipping/${id}`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_BILLING_ADDRESS]({ commit }, id) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/address/billing/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_SHIPPING_ADDRESS]({ commit }, id) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/address/shipping/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ADDRESS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.AFTER_DELETE_SHIPPING_ADDRESS]({ commit }, { address, addresses }) {
    const updatedAddresses = addresses.filter((a) => a.id !== address.id)
    commit(types.SET_AFTER_DELETE_SHIPPING_ADDRESS, updatedAddresses)
  },
  [types.AFTER_DELETE_BILLING_ADDRESS]({ commit }, { address, addresses }) {
    const updatedAddresses = addresses.filter((a) => a.id !== address.id)
    commit(types.SET_AFTER_DELETE_BILLING_ADDRESS, updatedAddresses)
  },
}
