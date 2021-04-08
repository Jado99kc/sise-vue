import firebase from "@/firebase";
import router from "@/router";

let provider = new firebase.auth.GoogleAuthProvider();
export default {
  namespaced: true,
  state: {
    user: null,
    newUser: false,
    error: null,
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          );
        console.log(res.user);
        commit("TOGGLE_NEW_USER");
        router.push("/login");
        return res.user;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async loginWithGoogle({ commit }) {
      try {
        const res = await firebase.auth().signInWithPopup(provider);
        console.log(res.user);
        // commit('TOGGLE_NEW_USER')
        // router.push('/login')
      } catch (error) {
        console.log(error);
      }
    },
    async login({ commit }, credentials) {
      console.log("credenciales", credentials);
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password);
        const user = {
          email: res.user.email,
          id: res.user.uid,
        };
        commit("SET_USER", user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
        return res.user;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    validateSession({ commit }) {
      if (localStorage.getItem("user")) {
        commit("SET_USER", JSON.parse(localStorage.getItem("user")));
      } else {
        commit("SET_USER", null);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("SET_USER", null);
      commit('SET_ERROR', null)
      router.push("/login");
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    TOGGLE_NEW_USER(state) {
      state.newUser = true;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return !!state.user;
    },
  },
};
