import sharedMutations from "vuex-shared-mutations";

export const storage = {
    state: {
        drawer: true,
        token: localStorage.getItem("token") || "",
        isLoggedIn: localStorage.getItem("token") ? true : false,
        isAdmin: localStorage.getItem("role") == "Admin" ? true : false,
        errors: [],
        successMsg: [],
        headers: {
            headers: {
                Authorization: "Bearer  " + localStorage.getItem("token")
            }
        },
        udata: {}
    },
    mutations: {
        clearErrors(state) {
            state.errors = [];
        },
        clearMessages(state) {
            state.successMsg = [];
        },
        SetErrors(state, payload) {
            state.errors.push(payload);
        },
        setMessages(state, payload) {
            state.successMsg.push(payload);
        },
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        register(state, payload) {
            let _this = this;
            axios
                .post("register", payload)
                .then(function(response) {
                    if (response.status == 200) {
                        state.token = response.data.success.token;
                        state.isLoggedIn = true;
                        localStorage.setItem(
                            "token",
                            response.data.success.token
                        );
                        let header = {
                            headers: {
                                Authorization:
                                    "Bearer  " + response.data.success.token
                            }
                        };
                        state.headers = header;
                        router.push({
                            path: "/"
                        });
                    } else {
                        var err = response.data.error;
                        for (let index in err) {
                            if (err[index] !== undefined)
                                state.errors.push(err[index][0]);
                        }
                    }
                })
                .catch(function(error) {
                    _this.commit("SetErrors", error.response.data.message);
                });
        },
        login(state, payload) {
            let _this = this;
            axios
                .post("login", payload)
                .then(function(response) {
                    if (response.status == 200) {
                        state.token = response.data.success.token;
                        state.isLoggedIn = true;
                        localStorage.setItem(
                            "token",
                            response.data.success.token
                        );
                        let header = {
                            headers: {
                                Authorization:
                                    "Bearer  " + response.data.success.token
                            }
                        };
                        state.headers = header;
                        router.push({
                            path: "/"
                        });
                    } else {
                        var err = response.data.error;
                        state.errors.push(err);
                    }
                })
                .catch(function(error) {
                    _this.commit("SetErrors", error.response.data.message);
                });
        },
        logout(state) {
            let _this = this;
            axios
                .post("logout", state.headers)
                .then(response => {
                    state.token = "";
                    state.udata = {};
                    state.isLoggedIn = false;
                    localStorage.setItem("token", "");
                    router.push({
                        path: "/login"
                    });
                })
                .catch(error => {
                    _this.commit("SetErrors", error.response.data.message);
                });
        },
        getUserData(state, payload) {
            let _this = this;
            axios
                .get("user", state.headers)
                .then(response => {
                    state.udata = {
                        ...state.udata,
                        ...response.data.data
                    };

                    state.isAdmin =
                        response.data.data.user.role == "Admin" ? true : false;
                    localStorage.setItem("role", response.data.data.user.role);
                })
                .catch(error => {
                    _this.commit("SetErrors", error.response.data.message);
                });
        },
        removeUser(state, payload) {
            let _this = this;

            axios
                .post("remove-user", payload, state.headers)
                .then(function(response) {
                    if (response.data.success) {
                        _this.commit("getUsers");
                        _this.commit("getUserData");
                    }
                })
                .catch(function(error) {
                    _this.commit("SetErrors", error.response.data.message);
                });
        },
        updateUser(state, payload) {
            let _this = this;

            axios
                .post("update-user", payload, state.headers)
                .then(function(response) {
                    if (response.data.success) {
                        _this.commit("getUserData");
                        _this.commit("setMessages", response.data.message);
                    }
                })
                .catch(function(error) {
                    _this.commit("SetErrors", error.response.data.message);
                });
        }
    },
    actions: {
        TOGGLE_DRAWER({ commit }) {
            commit("toggleDrawer");
        }
    },
    getters: {
        headers(state) {
            return state.headers;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        isAdmin(state) {
            return state.isAdmin;
        },
        getErrors(state) {
            return state.errors;
        },
        getMessages(state) {
            return state.successMsg;
        },
        DRAWER_STATE(state) {
            return state.drawer;
        },
        loaderStatus(state) {
            return state.loaderStatus;
        },
        fetchDetails(state) {
            let data = {};
            data = state.udata;
            return data;
        }
    }
};
