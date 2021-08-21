<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content">
      <router-view />
    </v-main>
    <v-dialog v-model="dialog" overlay width="500">
      <v-card color="primary" dark class="pa-5">
        <v-card-text>
          Please stand by loading data...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <li v-for="(error, i) in throwErrors" :key="i">
      {{ error }}
    </li>

    <li v-for="(msg, i) in throwSucess" :key="i">
      {{ msg }}
    </li>
  </v-app>
</template>

<script>
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/Layout.scss";

export default {
  name: "Layout",
  components: { Header, Sidebar },
  data() {
    return {
      noAction: [
        "search",
        "upload",
        "addimages",
        "gallery",
        "justsave",
        "stars",
      ],
      noThisAction: 0,
      dialog: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    loader() {
      return this.$store.getters.loaderStatus;
    },

    throwErrors() {
      let errors = this.$store.getters.getErrors;
      if (errors.length === 0) return;
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
    throwSucess() {
      let msgs = this.$store.getters.getMessages;
      msgs.forEach((msg) => {
        this.$toast.success(msg, {
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

      this.$store.commit("clearMessages");
      return this.$store.getters.getMessages;
    },
  },
  created() {
    this.axios.interceptors.request.use(
      (config) => {
        this.noThisAction = 0;
        const urlpath = config.url.split("?")[0];
        if (this.noAction.indexOf(urlpath) === -1) {
          this.noThisAction = 1;
        } else {
          if (urlpath == "gallery" && config.data.page <= 1) {
            this.noThisAction = 1;
          }
        }
        if (this.noThisAction === 1) {
          this.dialog = true;
        } else {
          this.dialog = false;
        }
        return config;
      },
      (error) => {
        if (this.noThisAction === 1) {
          setTimeout(() => (this.dialog = false), 500);
          setTimeout(
            () =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              }),
            1
          );
          this.noThisAction = 0;
        } else {
        }
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response) => {
        if (this.noThisAction === 1) {
          setTimeout(() => (this.dialog = false), 500);
          setTimeout(
            () =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              }),
            1
          );
        } else {
          this.noThisAction = 0;
        }
        return response;
      },
      (error) => {
        if (this.noThisAction === 1) {
          setTimeout(() => (this.dialog = false), 500);
          setTimeout(
            () =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              }),
            1
          );
          this.noThisAction = 0;
        } else {
        }
        return Promise.reject(error);
      }
    );
  },

  beforeMount: function () {
    this.getUserData();
  },

  watch: {
    $route: function (to, from) {
      this.getUserData();
    },
  },
  methods: {
    getUserData() {
      if (this.isLoggedIn) {
        this.$store.commit("getUserData");
      }
    },
  },
};
</script>

<style src="../../styles/Layout.scss" lang="scss" />
