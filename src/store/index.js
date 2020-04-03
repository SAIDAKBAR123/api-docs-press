import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pro: {},
    user: {
      name: '',
      id: '',
      projects: []
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user.id = payload.id
    },
    CREATE_PROJECT (state, payload) {
      state.user.projects.push(payload)
    },
    SET_PROJECTS (state, payload) {
      state.user.projects = payload
    }
  },
  actions: {
    signIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res => {
        console.log(res)
        const newUser = {
          id: res.user.uid,
          name: '',
          projects: []
        }
        commit('SET_USER', newUser)
      }).catch(err => console.log(err))
    },
    createProject ({ commit }, payload) {
      firebase.database().ref('projectList').push(payload).then(res => {
        console.log(res)
        const key = res.key
        commit('CREATE_PROJECT', {
          id: key,
          ...payload
        })
      }).catch(err => console.log(err))
    },
    getProjects ({ commit }) {
      firebase.database().ref('projectList').once('value').then(data => {
        const projects = []
        const obj = data.val()
        for (const key in obj) {
          projects.push({
            id: key,
            description: obj[key].title,
            title: obj[key].description,
            date: obj[key].date
          })
          console.log(projects)
          commit('SET_PROJECTS', projects)
        }
      }).catch(err => console.log(err))
    }
  },
  modules: {
  }
})
