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
                           <v-col v-if="$store.state.error.length > 0" cols="12">
                             <v-alert
                            dense
                            outlined
                            type="error"
                          >
                            {{$store.state.error}}
                          </v-alert>
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
      alert: false,
      username: '',
      password: ''
    }
  },
  computed: {
    dialog () {
      return this.$store.state.user.id == null || this.$store.state.user.id === ''
    }
  },
  methods: {
    checker () {
      // eslint-disable-next-line eqeqeq
      this.$store.dispatch('signIn', { email: this.username, password: this.password }).then(() => {
      }).catch((err) => console.log(err))
    }
  }
  // created () {
  //   if (this.$store.state.user.id.length > 0) {
  //     return 1
  //   } else {
  //     this.dialog = true
  //   }
  // }
}
</script>

<style>
.sad{
color: #111111;
}
</style>
