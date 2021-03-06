import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import config from "../config";
import "font-awesome/css/font-awesome.css";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: config.light
        }
    }
});
