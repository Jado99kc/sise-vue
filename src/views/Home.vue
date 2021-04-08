<template>
  <v-container
    class="fill-height d-flex flex-column justify-space-around align-center"
  >
    <div class="pa-3">
      <v-img
        class="image"
        lazy-src="@/assets/logo_upb.png"
        max-height="300"
        max-width="300"
        src="@/assets/logo_upb.png"
      ></v-img>
    </div>
    <div>
      <router-link to="/login">
        <v-btn width="300px">Iniciar Sesion</v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
.image {
  border-radius: 20px;
}
</style>
