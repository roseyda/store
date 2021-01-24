<template>
  <v-dialog :value="dialog" persistent max-width="600px">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Contact</v-toolbar-title>
      </v-toolbar>

      <v-form ref="contactForm" v-model="valid" @submit.prevent="sendContact()">
        <v-card-text>
          <v-row no-gutters class="mt-4">
            <v-col cols="12" lg="6" class="pa-2">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" class="pa-2">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="pa-2">
              <v-textarea
                v-model="message"
                :rules="messageRules"
                clearable
                clear-icon="mdi-close-circle"
                label="Message"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('update:dialog', false)">
            Cancel
          </v-btn>
          <v-btn type="submit" color="primary" text :disabled="!valid">
            Send
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    valid: false,
    name: '',
    nameRules: [(v) => !!v || 'name is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'email is required',
      (v) => /.+@.+\..+/.test(v) || 'invalid email',
    ],
    message: '',
    messageRules: [(v) => !!v || 'message is required'],
  }),
  methods: {
    sendContact() {
      // TODO: send contact info
      console.log('contact info sent => message: ', this.message)
      this.$emit('update:dialog', false)
    },
  },
}
</script>
