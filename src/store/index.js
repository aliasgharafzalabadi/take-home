import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user: {},
        }
    },
    mutations: {
        SET_USER(state, _user) {
            state.user = _user;
        },
    },
    actions: {
        User({ commit }, _user) {
            localStorage.setItem("user", JSON.stringify( _user));
            commit("SET_USER",  _user);
        },
        logout({ commit }) {
            localStorage.setItem("user", {});

            commit("SET_USER", {});
        },
    }
})

export default store;
