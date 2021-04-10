import firebase from "@/firebase";
import router from "@/router";

// let provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore()
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
        // console.log(res.user);
        await db.collection('Estudiantes').doc(res.user.uid).set({email:res.user.email})
        await db.collection('Materias_Estudiante').doc(res.user.uid).set({materias:{}})
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
    async login({ commit, rootState }, credentials) {
      console.log("credenciales", credentials);
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password);
          let estudiante =  await db.collection('Estudiantes').doc(res.user.uid).get()
        const user = {
          ...estudiante.data(),
          "id":res.user.uid
        };
        // user.id = res.user.uid,
        // commit('estudiantes/SET_ESTUDIANTE',user,{root:true} )
        commit("SET_USER", user);
        localStorage.setItem("user", JSON.stringify({email:res.user.email, id: res.user.uid}));
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
        router.push("dashboard");
      } else {
        commit("SET_USER", null);
        router.push("/login");
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
