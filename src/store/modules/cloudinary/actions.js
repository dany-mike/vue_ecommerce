import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.UPLOAD_IMAGE]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/cloudinary`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_IMAGE_PAYLOAD, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_IMAGES]({ commit }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/cloudinary`)
      .then((response) => {
        commit(types.SET_IMAGE_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  //   TODO: add delete image from my backoffice
  //   [types.DELETE_IMAGE]({ commit }, { userId, productId }) {
  //     console.log(commit)
  //     return axios
  //       .delete(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}/${productId}`, {
  //         headers: authHeader(),
  //       })
  //       .catch((err) => console.log(err))
  //   },
}