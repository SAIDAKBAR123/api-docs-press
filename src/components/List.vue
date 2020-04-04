<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn to="/"  text color="primary"> <v-icon left>mdi-backburger</v-icon> Back</v-btn>
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
         <v-btn color="blue darken-3" dark rounded raised @click="addCommit">Commit</v-btn>
      </v-col>
    </v-row>
    <v-row class="my-2" justify="center" v-for="(item,i) in codes" :key="i">
       <v-col class="py-0" cols="8">
         <v-card class="py-0">
           <v-card-title>{{item.title}}</v-card-title>
           <v-card-subtitle class="py-0"> <p class="descript">{{item.description}}</p></v-card-subtitle>
           <v-row class="mx-2 py-0" justify="space-between" align="center" align-self="center">
             <v-col cols="1">
               <v-btn text outlined :color="item.color">{{item.type}}</v-btn>
             </v-col>
             <v-col cols="8">
                 <p class="codeing pt-2">  {{item.code}}</p>
             </v-col>
              <v-col cols="auto">
               <v-btn  @click="getCode(item.code)"><v-icon>mdi-content-copy</v-icon></v-btn>
             </v-col>
           </v-row>
         </v-card>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['id'],
  data: () => ({
    selectedType: '',
    codeSource: '',
    define: '',
    items: [
      { id: 1, name: 'GET', color: '' },
      { id: 2, name: 'POST', color: '' },
      { id: 3, name: 'DELETE', color: '' },
      { id: 4, name: 'UPDATE', color: '' }

    ],
    codess: [
      {
        type: 'POST',
        color: 'warning',
        code: '/create/user',
        title: 'USERS',
        description: '// this part will be available aftar a day'
      }
    ]
  }),
  computed: {
    codes () {
      return this.$store.state.apiList
    }
  },
  methods: {
    getCode (code) {
      this.$clipboard(code)
    },
    addCommit () {
      console.log(this.selectedType)
      if (this.selectedType === 'DELETE') {
        this.$store.dispatch('addApi',
          {
            key: this.id,
            type: this.selectedType,
            color: 'error',
            title: this.define,
            code: this.codeSource,
            description: '//test mode is on'
          }
        ).then(() => {
          this.selectedType = ''
          this.define = ''
          this.description = ''
          this.codeSource = ''
          this.$store.dispatch('getApiList', { key: this.id })
        }).catch(err => console.log(err))
      } else if (this.selectedType === 'GET') {
        this.$store.dispatch('addApi',
          {
            key: this.id,
            type: this.selectedType,
            color: 'error',
            title: this.define,
            code: this.codeSource,
            description: '//test mode is on'
          }
        ).then(() => {
          this.selectedType = ''
          this.define = ''
          this.description = ''
          this.codeSource = ''
          this.$store.dispatch('getApiList', { key: this.id })
        }).catch(err => console.log(err))
      } else if (this.selectedType === 'POST') {
        this.$store.dispatch('addApi',
          {
            key: this.id,
            type: this.selectedType,
            color: 'error',
            title: this.define,
            code: this.codeSource,
            description: '//test mode is on'
          }
        ).then(() => {
          this.selectedType = ''
          this.define = ''
          this.description = ''
          this.codeSource = ''
          this.$store.dispatch('getApiList', { key: this.id })
        }).catch(err => console.log(err))
      } else if (this.selectedType === 'UPDATE') {
        this.$store.dispatch('addApi',
          {
            key: this.id,
            type: this.selectedType,
            color: 'error',
            title: this.define,
            code: this.codeSource,
            description: '//test mode is on'
          }
        ).then(() => {
          this.selectedType = ''
          this.define = ''
          this.description = ''
          this.codeSource = ''
          this.$store.dispatch('getApiList', { key: this.id })
        }).catch(err => console.log(err))
      }
    }
  },
  created () {
    this.$store.dispatch('getApiList', { key: this.id })
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
.codeing {
 font-family: 'Source Code Pro', monospace;
  font-weight: 500;
  font-size:16pt;
}
.descript {
font-family: 'Open Sans', sans-serif;
font-weight: 600;
font-size: 13pt;
color: rgb(21, 121, 21)
}
</style>
