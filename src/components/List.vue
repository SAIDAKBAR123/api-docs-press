<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn to="/" text color="primary">
          <v-icon left>mdi-backburger</v-icon> Back</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <v-select
          v-model="selectedType"
          :items="items"
          item-text="name"
          label="Select a category"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="define"
          color="blue darken-3"
          label="About Code"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="codeSource"
          color="blue darken-3"
          label="api code"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="blue darken-3" dark rounded @click="dialog = true"
          >Continue</v-btn
        >
      </v-col>
    </v-row>
    <template v-if="codes.length > 0">
      <v-row>
        <v-col cols="8" md="8" >
      <v-row class="my-2" justify="start" v-for="(item, i) in codes" :key="i">
        <v-col class="py-0">
          <v-card class="py-0">
            <v-card-title
              ><p class="descript">// {{ item.title }}</p>
              <v-spacer />
              <edit-api-dialog v-if="isCreator(item)" :projectDetail="item"/>
            </v-card-title>
            <v-card-subtitle class="py-0">
              <!-- <p class="descript">{{ item.description }}</p> -->
              </v-card-subtitle
            >
            <v-row
              class="mx-2 py-0"
              justify="space-between"
              align="center"
              align-self="center"
            >
              <v-col cols="1">
                <v-btn text outlined :color="item.color" @click="example.code = item.description">{{ item.type }}</v-btn>
              </v-col>
              <v-col cols="8">
                <p class="codeing pt-2">{{ item.code }}</p>
              </v-col>
              <v-col cols="auto">
                <v-btn text fab @click="getCode(item.code)"
                  ><v-icon>mdi-content-copy</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
        </v-col>
           <v-col  class="my-2" cols="4">
          <v-card tile flat class="transparent">
            <prism-editor readonly :code="example.code" lineNumbers language="js"></prism-editor>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <v-progress-linear
      v-else
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
    <!---Diallog herew -->
     <v-dialog
      v-model="dialog"
      width="700"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Expected Value
        </v-card-title>

        <v-card-text>
             <prism-editor v-model="description" :code="description" lineNumbers language="js"></prism-editor>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addCommit"
          >
            Commit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['id'],
  data: () => ({
    dialog: false,
    example: {
      code: ''
    },
    code: `const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/list/:id',
    name: 'List',
    props: true,
    component: () => import('../components/List.vue')
  }

]`,
    selectedType: '',
    codeSource: '',
    description: ' // your js here',
    define: '',
    items: [
      { id: 1, name: 'GET', color: '' },
      { id: 2, name: 'POST', color: '' },
      { id: 3, name: 'DELETE', color: '' },
      { id: 4, name: 'UPDATE', color: '' }
    ],
    codess: []
  }),
  computed: {
    codes () {
      return this.$store.state.apiList
    }
  },
  methods: {
    isCreator (item) {
      return item.creatorId === this.$store.state.user.id
    },
    getCode (code) {
      this.$clipboard(code)
    },
    addCommit () {
      this.dialog = false
      if (this.selectedType === 'DELETE') {
        this.$store
          .dispatch('addApi', {
            key: this.id,
            type: this.selectedType,
            color: 'error',
            title: this.define,
            code: this.codeSource,
            description: this.description,
            creatorId: this.$store.state.user.id
          })
          .then(() => {
            this.selectedType = ''
            this.define = ''
            this.description = ''
            this.codeSource = ''
            this.$store.dispatch('getApiList', { key: this.id })
          })
          .catch((err) => console.log(err))
      } else if (this.selectedType === 'GET') {
        this.$store
          .dispatch('addApi', {
            key: this.id,
            type: this.selectedType,
            color: 'primary',
            title: this.define,
            code: this.codeSource,
            description: this.description,
            creatorId: this.$store.state.user.id
          })
          .then(() => {
            this.selectedType = ''
            this.define = ''
            this.description = ''
            this.codeSource = ''
            this.$store.dispatch('getApiList', { key: this.id })
          })
          .catch((err) => console.log(err))
      } else if (this.selectedType === 'POST') {
        this.$store
          .dispatch('addApi', {
            key: this.id,
            type: this.selectedType,
            color: 'success',
            title: this.define,
            code: this.codeSource,
            description: this.description,
            creatorId: this.$store.state.user.id
          })
          .then(() => {
            this.selectedType = ''
            this.define = ''
            this.description = ''
            this.codeSource = ''
            this.$store.dispatch('getApiList', { key: this.id })
          })
          .catch((err) => console.log(err))
      } else if (this.selectedType === 'UPDATE') {
        this.$store
          .dispatch('addApi', {
            key: this.id,
            type: this.selectedType,
            color: 'warning',
            title: this.define,
            code: this.codeSource,
            description: this.description,
            creatorId: this.$store.state.user.id
          })
          .then(() => {
            this.selectedType = ''
            this.define = ''
            this.description = ''
            this.codeSource = ''
            this.$store.dispatch('getApiList', { key: this.id })
          })
          .catch((err) => console.log(err))
      }
    }
  },
  created () {
    console.log(this.id)
    this.$store.dispatch('getApiList', { key: this.id })
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap");
.codeing {
  font-family: "Source Code Pro", monospace;
  font-weight: 400;
  word-spacing: 2px;
  font-size: 13pt;
}
.descript {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 13pt;
  color: rgb(21, 121, 21);
}
</style>
