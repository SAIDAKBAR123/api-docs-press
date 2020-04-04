<template>
  <div>
      <v-dialog persistent width="500" v-model="edit">
          <template v-slot:activator="{ on }"><v-btn v-on="on" fab small text>
          <v-icon>mdi-fountain-pen-tip</v-icon>
          </v-btn>
          </template>
          <v-card>
              <v-card-title class="px-2 py-1">
                  <span>Edit Project</span>
                  <v-spacer></v-spacer>
                  <v-btn color="red" small text fab><v-icon >mdi-trash-can</v-icon></v-btn>
              </v-card-title>
                <v-card-text>
                  <v-row justify="center">
                      <v-col cols="12">
                          <v-text-field dense outlined v-model="project.title"  label="Title"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field dense outlined v-model="project.description" label="Description"></v-text-field>
                      </v-col>
                  </v-row>
                </v-card-text>
              <v-card-actions class="py-0" >
                  <v-spacer></v-spacer>
                    <v-btn text large @click="updateData" class=" blue--text darken-1">Save</v-btn>
                   <v-btn  text large class="blue--text darken-1" @click="edit = false">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    projectDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      edit: false,
      project: {
        id: this.projectDetail.id,
        title: this.projectDetail.title,
        description: this.projectDetail.description
      }
    }
  },
  methods: {
    updateData () {
      this.$store.dispatch('updateProject', this.project).then(() => {
        this.edit = false
        this.$store.dispatch('getProjects')
      })
    }
  }
}
</script>

<style>

</style>
