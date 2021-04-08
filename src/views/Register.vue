<template>
  <div>
    <v-container fluid pa-0>
      <v-row align="center" justify="center" style="height: 100vh" dense>
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

              <div class="d-flex justify-space-between mt-3">
                <div>
                  <router-link to="/login"
                    ><v-subheader class="pa-0">Ya tienes cuenta?</v-subheader></router-link
                  >
                </div>

               
              </div>
               <div>
                  <v-btn
                    block
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="handleRegister"
                  >
                    Registrar
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
import { mapActions } from 'vuex';
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
    ],
  }),

  methods: {
    ...mapActions({
      register: 'auth/register'
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
    async handleRegister(){
      const credentials = {
        email:this.email,
        password:this.password,
      }
      const res = await this.register(credentials)
      if(res.message){
        this.$swal('opps!', res.message, 'error')
      }
    }
  },
};
</script>

<style scoped>
.image {
  border-radius: 20px;
}
</style>