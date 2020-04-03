<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                 <v-dialog
                    v-model="openProject"
                    width="700"
                    persistent
                    >
                    <v-card>
                       <v-card-title>
                           Create new Project
                       </v-card-title>
                       <v-card-text>
                        <v-row justify="center">
                           <v-col cols="12">
                               <v-text-field v-model="project.title" label="Name of New project"></v-text-field>
                           </v-col>
                           <v-col cols="12">
                               <v-text-field v-model="project.description" label="Short Description"></v-text-field>
                           </v-col>
                           <v-col cols="auto">
                                <v-btn color="success" @click="createProject" tile large>Create</v-btn>
                                 <v-btn class="mx-2" color="error" @click="newProject.flag = false" tile large text>Cancel</v-btn>
                           </v-col>
                       </v-row>
                       </v-card-text>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  props: {
    newProject: {
      type: Object,
      required: true
    }
  },
  computed: {
    openProject () {
      return this.newProject.flag
    }
  },
  data () {
    return {
      dialog: true,
      project: {
        description: '',
        title: '',
        id: ''
      }
    }
  },
  methods: {
    createProject () {
      this.newProject.data.unshift(
        {
          id: 2,
          title: this.project.title,
          posts: [],
          description: this.project.description,
          date: new Date().getDate()
        }
      )
      this.newProject.flag = false
      console.log(this.project)
    }
  }
}
</script>

<style>
.sad{
color: #111111;
}
</style>
