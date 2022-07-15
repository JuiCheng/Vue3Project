import { createStore } from 'vuex'
import SecureLS from 'secure-ls'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import Url from './Url'

const ls = new SecureLS({ isCompression: false })
export default createStore({
  state: {
    UserInfo: { id: 1, account: '113' },
    passwd: '1234645'
  },
  getters: {
  },
  mutations: {
    SetUserInfo (state, payload) {
      state.UserInfo = payload
    }
  },
  actions: {
    RESTfulPost: async function (commit, payload) {
      const headers = {
        'Content-Type': 'application/json',
        token: auth.state.token
      }
      const response = axios
        .post(payload.URL, payload.Data, {
          headers: headers,
          params: payload.params
        })
        .then(response => {
          return response.data
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
          if (error.response.status === 401) {
            // alert('登入驗證過期，請重新登入')
            // router.push('/error/401')
          }
        })
      return response
    },
    RESTfulGet: async function (commit, payload) {
      const headers = {
        'Content-Type': 'application/json',
        token: auth.state.token
      }
      const response = axios
        .get(payload.URL, {
          headers: headers,
          params: payload.params
        })
        .then(response => {
          return response.data
        })
        .catch(function (error) { // 请求失败处理
          if (error.response.status === 401) {
            // alert('登入驗證過期，請重新登入')
            // router.push('/error/401')
          }
        })
      // // console.log(response)
      return response
    }
  },
  modules: {
    auth,
    Url
  },
  plugins: [
    createPersistedState({
      // 明碼存特定資訊
      // reducer (val) {
      //   return {
      //     user: val.UserInfo // 只儲存使用者資料 key: value
      //   }
      // }
      // 加密存資訊，但與Chrome DevTools Vue會脫鉤
      key: 'userInfo', // 儲存在 localStorage 的 key
      storage: {
        getItem: key => { console.log(ls.get(key)); ls.get(key) },
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})
