import { createStore } from 'vuex'
import SecureLS from 'secure-ls'
import createPersistedState from 'vuex-persistedstate'
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
  },
  modules: {
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
