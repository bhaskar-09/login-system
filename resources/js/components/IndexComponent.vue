<template>
  <v-container fluid class="typography-page">
    <h1 class="mt-10 mb-6 text--black text-center">Welcome Home</h1>
    <h3 class="mb-6 text--black text-center">{{ user.name }}</h3>
    <v-card class="mx-auto">
      <v-card-text>
        <v-form lazy-validation>
          <v-col>
            <v-text-field
              v-model.trim="form.name"
              :rules="nameRules"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="Email Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :rules="passRules"
              type="password"
              label="Password"
              hint="At least 6 characters"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex justify-space-between">
            <v-btn
              large
              block
              :disabled="form.name.length === 0 || form.email.length === 0"
              color="primary"
              @click.prevent="update"
            >
              Update</v-btn
            >
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
export default {
  name: "Index",
  data() {
    return {
      nameRules: [(v) => !!v || "Please Enter Your Full Name"],
      emailRules: [
        (v) => !!v || "Please Enter Your Email ID",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Need To Enter Valid Email ID",
      ],

      passRules: [
        (v) => !!v || "Please Enter Password",
        (v) => v.length >= 6 || "Password Should be Min 6 characters",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(v) ||
          "Use Strong Password",
      ],

      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    user() {
      if (this.$store.getters.fetchDetails.user !== undefined) {
        this.form.password = "";
        this.form = {
          ...this.form,
          ...this.$store.getters.fetchDetails.user,
        };

        return this.$store.getters.fetchDetails.user;
      } else {
        return {
          name: "",
          email: "",
        };
      }
    },
  },
  mounted() {},
  methods: {
    update() {
      let data = {
        id: this.form.id,
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      };

      this.$store.commit("updateUser", data);
    },
  },
};
</script>
