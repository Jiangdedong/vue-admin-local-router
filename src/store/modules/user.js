import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Encrypt } from '@/utils/cryptojs'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginAccount, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginAccount: loginAccount.trim(), password: Encrypt(password.trim()) }).then(response => {
        if (response.statusCode === 200) {
          commit('SET_TOKEN', response.result.token)
          setToken(response.result.token)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const res = response.result
        if (!response) {
          reject('Verification failed, please Login again.')
        }
        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        let roles = []
        if (res.type === 1) {
          roles = ['admin']
        } else {
          roles = ['tourist']
        }
        res.roles = roles
        commit('SET_ROLES', roles)
        commit('SET_NAME', res.name)
        // commit('SET_AVATAR', avatar)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

