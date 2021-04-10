<template>
  <v-app>
    <div v-if="authenticated">
      <v-navigation-drawer  v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            SISE
          </v-list-item-title>
          <v-list-item-subtitle>
            UPB
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- logout button -->
        <v-list-item @click="handleLogout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
           <v-list-item-content>
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{currentRouteName}}</v-toolbar-title>
      </v-app-bar>
    </div>
    <v-main class="blue-grey darken-3">
      <vue-page-transition name="fade-in-right">
        <router-view style="height: 100vh"></router-view>
      </vue-page-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: null,
    items: [
      { title: "Bandeja de Entrada", icon: "mdi-view-dashboard", link: '/dashboard' },
      { title: "Califiaciones", icon: "mdi-counter", link: '/calificaciones' },
      { title: "Estatus", icon: "mdi-state-machine", link: '/estatus' },
      { title: "Materias", icon: "mdi-book-multiple", link: '/materias' },
    ],
    right: null,
  }),
  methods: {
    ...mapActions({
      validateSession: "auth/validateSession",
      logout: 'auth/logout'
    }),
    handleLogout(){
      this.logout()
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/userIsAuthenticated",
    }),
    currentRouteName() {
        return this.$route.name;
    }
  },
  mounted() {
    this.validateSession();
  },
};
</script>
<style>
a {
  text-decoration: none;
}
</style>