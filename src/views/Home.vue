
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card tile flat color="transparent" >
          <v-row justify="space-between" align="center">
            <v-col cols="auto">
              <h1>Projects</h1>
            </v-col>
            <v-col cols="auto">
              <v-btn dark large color="rgb(77,132,254)" @click="createProject">Add Project</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="false" class="mt-5" align="center" align-content="center" justify="center">
            <v-col cols="7" align-self="center">
               <v-text-field
                  rounded
                  label="Search"
                  solo
               ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
      <transition name="slide-fade">
    <v-row v-if="list.length >0" >
      <v-col  v-for="(item,i) in list" :key="i" cols="3">
        <v-card>
          <v-card-title class="py-1 px-1">
            <h4 class="px-1">{{ item.title.length > 19? item.title.substring(0,18)+ '...' : item.title}}</h4>
            <v-spacer>
            </v-spacer>
            <template v-if="isCreator(item.creatorId)">
              <edit-dialog :projectDetail="item" />
            </template>
          </v-card-title>
          <v-card-text>
            <p>Done 2 posts</p>
            <v-progress-linear height="10" value="15"></v-progress-linear>
            <p class="pt-2 pb-0">{{item.description}}</p>
             <v-row>
               <v-col>
                 <h4> Created: {{item.dates}}</h4>
               </v-col>
             </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <span class="ma-2"><strong><small>Collaborator: {{ user_name }}</small></strong></span>
          <v-card-actions class="py-0">
            <v-row class="ml-3 py-2">
              <v-col class="px-0" v-for="i in 1" :key="i" cols="auto">
                 <v-avatar v-if="false" class="mx-n1 elevation-10" size="30"><v-img src="https://st4.depositphotos.com/3396639/20864/i/1600/depositphotos_208647302-stock-photo-happy-female-programmer-looking-cafeteria.jpg"></v-img></v-avatar>
              </v-col>
              <v-spacer>
              </v-spacer>
              <v-btn class="mx-3" text :to="'list/'+item.id" dark color="primary">Continue <v-icon right>mdi-chevron-double-right</v-icon></v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="auto">
        <h1 class="text-center display-1 font-weight-light my-4">There is no project yet</h1>
        <v-img max-width="320" src="https://www.jing.fm/clipimg/full/111-1115683_blank-flat-blue-without-solid-lines-or-mac.png"></v-img>
      </v-col>
    </v-row>
      </transition>
     <project :newProject="newProject" />
      <auth />
  </v-container>
</template>

<script>
import { database } from 'firebase'
import Project from '../components/Projects'
import Auth from '../components/Auth'
export default {
  data () {
    return {
      newProject: {
        flag: false,
        data: [
          {
            id: 1,
            title: 'LMS system',
            posts: [{}, {}],
            description: 'Description about the project shortly',
            date: 'Created: 2/20/2020'
          }
        ]
      }
    }
  },
  components: {
    Project,
    Auth
  },
  computed: {
    user_name () {
      return localStorage.getItem('uname')
    },
    list () {
      return this.$store.state.user.projects
    }
  },
  methods: {
    isCreator (payload) {
      return payload === this.$store.state.user.id
    },
    getInfo (id) {
      const api = []
      const apis = database().ref(`projectLists/${id}/apiList`).once('value').then(data => {
        const obj = data.val()
        for (const key in obj) {
          api.push({
            type: obj[key].type
          })
        }
        return api
      }).catch(err => console.log(err))
      return apis.length
    },
    createProject () {
      this.newProject.flag = true
    }
  },
  created () {
    this.$store.dispatch('getProjects')
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
</style>
