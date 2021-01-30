import { login, logout, getInfo } from '@/api/login'
import { getUserToken, setUserToken, removeUserToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    username: getUserToken().username,
    token: getUserToken().token,
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 存储授权信息
    saveAuthInfo({commit}, auth) {
      commit('SET_USERNAME', auth.username);
      commit('SET_TOKEN', auth.token);
    },
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const res = response.data
          if (res.status > 0) {
            setUserToken(res.data.name, res.data.password);
            commit('SET_USERNAME', res.data.name);
            commit('SET_TOKEN', res.data.password);
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.username, state.token).then(response => {
          const data = response.data
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.username, state.token).then((response) => {
          const data = response.data
          commit('SET_USERNAME', '');
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeUserToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERNAME', '');
        commit('SET_TOKEN', '');
        removeUserToken();
        resolve()
      })
    }
  }
}

export default user
