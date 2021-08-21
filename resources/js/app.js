require("./bootstrap");

window.Vue = require("vue").default;
import VueRouter from "vue-router";
Vue.use(VueRouter);

import { routes } from "./router/router";

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

global.router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    let isGranted = true;
    if (to.matched.some(record => record.meta.isAdmin)) {
        if (!store.getters.isAdmin) {
            isGranted = false;
        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn && isGranted) {
            next();
            return;
        }

        next("/login");
    } else {
        if (store.getters.isLoggedIn && to.name == "Login") {
            next("/");
            return;
        }
        next();
    }
});
import VueAxios from "vue-axios";
import axios from "axios";

import App from "./App.vue";
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "/api/v1/";
import Vuex from "vuex";

Vue.use(Vuex);

import { storage } from "./store/store";
const store = new Vuex.Store(storage);

import vuetify from "./plugins/vuetify";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast);

const app = new Vue(
    Vue.util.extend(
        {
            router,
            store,
            vuetify
        },
        App
    )
).$mount("#app");
