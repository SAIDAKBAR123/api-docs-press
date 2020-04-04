import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: localStorage.getItem('uid') || '',
      projects: []
    },
    apiList: [],
    error: ''
  },
  mutations: {
    SET_ERROR_MSG (state, error) {
      state.error = error
    },
    SET_USER (state, payload) {
      state.user.id = payload.id
    },
    CREATE_PROJECT (state, payload) {
      state.user.projects.push(payload)
    },
    SET_PROJECTS (state, payload) {
      state.user.projects = payload
    },
    SET_APILIST (state, payload) {
      state.apiList = payload
    }
  },
  actions: {
    logOut ({ commit }) {
      firebase.auth().signOut()
      localStorage.removeItem('uid')
      commit('SET_USER', { id: null })
    },
    autoSignIn ({ commit }, payload) {
      commit('SET_USER', { id: payload.uid, api: [] })
    },
    signIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res => {
        const newUser = {
          id: res.user.uid,
          name: '',
          projects: []
        }
        localStorage.setItem('uid', res.user.uid)
        commit('SET_USER', newUser)
      }).catch(err => {
        commit('SET_ERROR_MSG', err.message)
        console.log(err)
      })
    },

    createProject ({ commit, state }, payload) {
      const projectIn = {
        ...payload,
        creatorId: state.user.id
      }
      firebase.database().ref('projectLists').push(projectIn).then(res => {
        // console.log(res)
        const key = res.key
        commit('CREATE_PROJECT', {
          id: key,
          ...payload
        })
      }).catch(err => console.log(err))
    },

    getProjects ({ commit }) {
      firebase.database().ref('projectLists').once('value').then(data => {
        const projects = []
        const obj = data.val()
        for (const key in obj) {
          projects.push({
            id: key,
            description: obj[key].description,
            title: obj[key].title,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
          commit('SET_PROJECTS', projects)
        }
      }).catch(err => console.log(err))
    },
    addApi ({ commit }, payload) {
      const propertyKey = payload.key
      firebase.database().ref(`projectLists/${propertyKey}/apiList`).push(payload).then(res => {
        console.log(res)
      })
    },
    getApiList ({ commit }, payload) {
      const propertyKey = payload.key
      firebase.database().ref(`projectLists/${propertyKey}/apiList`).once('value').then(data => {
        const api = []
        const obj = data.val()
        for (const key in obj) {
          api.push({
            type: obj[key].type,
            color: obj[key].color,
            code: obj[key].code,
            title: obj[key].title,
            description: obj[key].description
          })
          commit('SET_APILIST', api)
        }
      }).catch(err => console.log(err))
    }
  },
  modules: {
  }
})
