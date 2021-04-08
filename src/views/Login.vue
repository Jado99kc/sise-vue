<template>
  <div>
    <v-container fluid pa-0>
      <v-row align="center" justify="center" style="height: 100vh" dense>
        <div>
        <v-alert v-if="newUser" class="mb-0 mt-3" type="success" dismissible>Listo! Ya puedes ingresar con tu cuenta!</v-alert>
        <v-alert v-if="error != null" class="mb-0" type="warning" color="red" dismissible>{{error}}</v-alert>
        </div>
        <v-col
          cols="12"
          lg="6"
          md="6"
          class="fill-height d-flex flex-column justify-center align-center"
        >
          <div class="pa-3">
            <v-img
              class="image"
              lazy-src="@/assets/logo_upb.png"
              max-height="200"
              max-width="200"
              src="@/assets/logo_upb.png"
            ></v-img>
          </div>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Correo"
                required
              ></v-text-field>

              <v-text-field
                type="password"
                v-model="password"
                :counter="20"
                :rules="passwordRules"
                label="Contraseña"
                required
              ></v-text-field>

              <div class="mt-3 align-center">
                <div>
                  <router-link to="/register"
                    ><v-subheader class="pa-0"
                      >Registrarse?</v-subheader
                    ></router-link
                  >
                </div>
              </div>
              <div>
                <v-btn
                  block
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="handleLogin"
                >
                  Login
                </v-btn>
              </div>
              <!-- <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Limpiar Campos
    </v-btn> -->

              <!-- <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn> -->
            </v-form>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    valid: true,
    password: "Rasengan99t",
    passwordRules: [
      (v) => !!v || "Contraseña requerida",
      (v) =>
        (v && v.length <= 20) ||
        "Contraseña no puede ser mayor a 20 caracteres",
    ],
    email: "2018011662@upb.edu.mx",
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
      (v) => /@upb\.edu\.mx$/.test(v) == true || "Correo debe pertenecer a UPB",
    ],
  }),

  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      const res = await this.login(credentials);
      if (res.message) {
        this.$swal("opps!", res.message, "error");
      }
    },
  },

  computed: {
    ...mapState({
      newUser: (state) => state.auth.newUser,
      error: (state) => state.auth.error,
    }),
  },
};
</script>

<style scoped>
.image {
  border-radius: 20px;
}
</style>