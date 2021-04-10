<template>
  <v-row justify="center">
    <v-dialog
      v-model="active"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="deep-purple darken-4">
          <v-btn icon dark @click="$emit('toggleModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Materias Disponibles</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="$emit('toggleModal')"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-alert
            v-if="!hayMateriasDisponibles"
            class="mb-0"
            type="warning"
            color="red"
            dismissible
            >No hay materias disponibles para cargar en este momento</v-alert
          >
          <div
            v-else
            v-for="materia in disponibles"
            :key="materia.id"
            class="mb-2"
          >
            <v-card :color="materia.color">
              <v-card-title>{{ materia.nombre }}</v-card-title>
              <v-card-subtitle>{{ materia.maestro }}</v-card-subtitle>
              <v-card-text
                >{{ materia.carrera }} ~ Cuatrimestre:
                {{ materia.cuatrimestre }}</v-card-text
              >
              <v-card-actions class="mt-1">
                <v-btn
                  text
                  color="grey lighten-5"
                  @click="handleCargar(materia)"
                  >Cargar</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    active: Boolean,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      getMaterias: "materias/getMaterias",
      cargaMateria: "materias/cargaMateria",
    }),
    async handleCargar(materia) {
      const res = await this.cargaMateria(materia);
      console.log(res)
      if (res.message) {
        this.$swal("!Oops", res.message, "error");
      } else {
        this.$swal("Listo!", "Materia Cargada", "success");
      }
    },
  },
  computed: {
    ...mapState({
      materias: (state) => state.materias.materias,
    }),
    ...mapGetters({
      disponibles: "materias/materiasDisponibles",
      hayMateriasDisponibles: "materias/hayMateriasDisponibles",
    }),
  },
  async mounted() {
    await this.getMaterias();
  },
};
</script>

<style>
</style>