<template>
  <div>
      <v-dialog persistent width="500" v-model="edit">
          <template v-slot:activator="{ on }"><v-btn v-on="on" fab small text>
          <v-icon>mdi-fountain-pen-tip</v-icon>
          </v-btn>
          </template>
          <v-card>
              <v-card-title class="px-2 py-1">
                  <span>Edit Api Route</span>
                  <v-spacer></v-spacer>
                  <v-btn color="red" @click="removeApi" small text fab><v-icon >mdi-trash-can</v-icon></v-btn>
              </v-card-title>
                <v-card-text>
                  <v-row justify="center">
                      <v-col cols="12">
                      <v-select
                        :items="items"
                        item-text="name"
                        v-model="project.type"
                        label="Select a category"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                          <v-text-field dense outlined v-model="project.title"  label="Title"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field dense outlined v-model="project.code" label="Code"></v-text-field>
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
        code: this.projectDetail.code,
        type: this.projectDetail.type,
        key: this.projectDetail.key
      },
      items: [
        { id: 1, name: 'GET', color: '' },
        { id: 2, name: 'POST', color: '' },
        { id: 3, name: 'DELETE', color: '' },
        { id: 4, name: 'UPDATE', color: '' }
      ]
    }
  },
  methods: {
    updateFunc (data) {
      this.$store.dispatch('updateApi', data).then(() => {
        this.edit = false
        this.$store.dispatch('getApiList', { key: data.key })
      })
    },
    removeApi () {
      this.$store.dispatch('removeApi', { key: this.project.key, id: this.project.id }).then(() => {
        this.edit = false
        alert('Route has been deleted, please if api route still here, refresh the page manually')
        this.$store.dispatch('getApiList', { key: this.projectDetail.key })
      })
    },
    updateData () {
      if (this.project.type === 'GET') {
        this.updateFunc({
          ...this.project,
          color: 'primary'
        })
      }
      if (this.project.type === 'POST') {
        this.updateFunc({
          ...this.project,
          color: 'success'
        })
      }
      if (this.project.type === 'UPDATE') {
        this.updateFunc({
          ...this.project,
          color: 'warning'
        })
      }
      if (this.project.type === 'DELETE') {
        this.updateFunc({
          ...this.project,
          color: 'error'
        })
      }
    }
  },
  created () {
  }
}
</script>

<style>

</style>
