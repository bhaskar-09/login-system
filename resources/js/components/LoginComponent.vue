<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-block">
            <v-img src="assets/logo.png" contain></v-img>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="login-part d-flex align-center justify-center"
        >
          <v-row no-gutters class="align-start">
            <v-col
              cols="12"
              class="login-part d-flex align-center justify-center flex-column"
            >
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`"> LOGIN </v-tab>
                  <v-tab :href="`#tab-newUser`"> New User </v-tab>

                  <v-tab-item :value="'tab-login'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p
                              class="
                                login-slogan
                                display-1
                                text-center
                                font-weight-medium
                                my-10
                              "
                            >
                              Good Morning, User
                            </p>
                          </v-col>

                          <v-form>
                            <v-col>
                              <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                value="admin@flatlogic.com"
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
                                class="text-capitalize"
                                large
                                block
                                :disabled="
                                  form.password.length === 0 ||
                                  form.email.length === 0
                                "
                                color="primary"
                                @click="login"
                              >
                                Login</v-btn
                              >

                              >
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p
                              class="
                                login-slogan
                                display-2
                                text-center
                                font-weight-medium
                                mt-10
                              "
                            >
                              Welcome!
                            </p>
                            <p
                              class="
                                login-slogan
                                display-1
                                text-center
                                font-weight-medium
                                mb-10
                              "
                            >
                              Create your account
                            </p>
                          </v-col>

                          <v-form>
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
                                :disabled="
                                  form.name.length === 0 ||
                                  form.email.length === 0 ||
                                  form.password === 0
                                "
                                color="primary"
                                @click.prevent="register"
                              >
                                Create your account</v-btn
                              >
                            </v-col>

                            <li v-for="(e, i) in throwErrors" :key="i">
                              {{ error }}
                            </li>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
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
    throwErrors() {
      let errors = this.$store.getters.getErrors;
      errors.forEach((error) => {
        this.$toast.error(error, {
          position: "top-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: false,
        });
      });

      this.$store.commit("clearErrors");
      return this.$store.getters.getErrors;
    },
  },
  methods: {
    login() {
      let data = {
        email: this.form.email,
        password: this.form.password,
      };

      this.$store.commit("login", data);

      return false;
    },
    register() {
      let data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      };

      this.$store.commit("register", data);

      return false;
    },
  },
};
</script>

<style src="../styles/Login.scss" lang="scss"/>
