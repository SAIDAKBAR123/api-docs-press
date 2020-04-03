<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                 <v-dialog
                 overlay-color="#111111"
                    v-model="dialog"
                    persistent
                    width="600"
                    >
                    <v-card>
                        <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                        >
                        GENTLEMAN ONLY
                        </v-card-title>

                        <v-divider></v-divider>
               <v-card-text>
                           <v-row>
                           <v-col>
                                <v-text-field
                            v-model="username"
                            label="Username"

                        ></v-text-field>
                         <v-text-field
                         v-model="password"
                            label="Password"

                        ></v-text-field>
                           </v-col>
                       </v-row>
               </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        block
                            color="primary"
                            outlined
                            large
                            @click="checker"
                        >
                            Enter
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      username: '',
      password: ''
    }
  },
  methods: {
    checker () {
      // eslint-disable-next-line eqeqeq
      if (this.username == 'azik98' && this.password == 'azik98') {
        this.dialog = false
        return 0
      }
    }
  },
  created () {
    setTimeout(() => {
      this.dialog = true
    }, 0)
  }
}
</script>

<style>
.sad{
color: #111111;
}
</style>
