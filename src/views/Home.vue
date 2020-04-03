
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
    <v-row >
      <v-col v-for="(item,i) in list" :key="i" cols="3">
        <v-card>
          <v-card-title class="py-1 px-1">
            <h4 class="px-1">{{item.title.substring(0,16)+ '...'}}</h4>
            <v-spacer>
            </v-spacer>
            <v-btn dense text fab><v-icon>mdi-dots-horizontal</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <p>Done 3 posts</p>
            <v-progress-linear height="10" value="15"></v-progress-linear>
            <p>{{item.description}}</p>
             <v-row>
               <v-col>
                 <h4> Created: {{item.date}}</h4>
               </v-col>
             </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <span class="ma-2"><strong><small>Collaborators</small></strong></span>
          <v-card-actions class="py-0">
            <v-row class="ml-3">
              <v-col class="px-0" v-for="i in 4" :key="i" cols="auto">
                 <v-avatar class="mx-n1 elevation-10" size="30"><v-img src="https://st4.depositphotos.com/3396639/20864/i/1600/depositphotos_208647302-stock-photo-happy-female-programmer-looking-cafeteria.jpg"></v-img></v-avatar>
              </v-col>
              <v-spacer>
              </v-spacer>
              <v-btn class="mx-3" text :to="'list/'+item.id" dark color="primary">Continue <v-icon right>mdi-chevron-double-right</v-icon></v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <project :newProject="newProject" />
      <auth />
    </v-row>
  </v-container>
</template>

<script>
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
    list () {
      return this.$store.state.user.projects
    }
  },
  methods: {
    createProject () {
      this.newProject.flag = true
    }
  },
  created () {
    this.$store.dispatch('getProjects')
  }
}
</script>

<style>

</style>
