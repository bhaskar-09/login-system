import Error from "../components/Error.vue";
import Layout from "../components/comon/Layout.vue";
import IndexComponent from "../components/IndexComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";

export const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginComponent,
        meta: {}
    },

    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "",
                name: "Dashboard",
                component: IndexComponent,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: "*",
        name: "Error",
        component: Error
    }
];
