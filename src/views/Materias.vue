<template>
  <v-container class="d-flex flex-column justify-space-between">
    <v-alert v-if="!estudianteTieneMaterias" class="mb-0" type="warning" color="red" dismissible
      >Aun no tienes materias cargadas</v-alert
    >  
    <v-container v-else>
      <div v-for="materia in materias" :key="materia.id" class="mb-2">
        <v-card :color="materia.color">
          <v-card-title>{{ materia.nombre }}</v-card-title>
          <v-card-subtitle>{{ materia.maestro }}</v-card-subtitle>
          <v-card-text
            >{{ materia.carrera }} ~ Cuatrimestre:
            {{ materia.cuatrimestre }}</v-card-text
          >
        </v-card>
      </div>
    </v-container>
     <ModalCargarMaterias :active="active" @toggleModal="active = false"/>
    <h3>Materias</h3>
    <v-footer padless fixed color="blue-grey darken-3">
      <v-container class="d-flex justify-end">
        <div>
          <v-btn @click="active = !active"
            color="deep-purple darken-4"
            fab
            medium
            fixed-bottom
            dark
            bottom
            left
            class="v-btn--example"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-footer>
    <div>
      
    </div>
    
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ModalCargarMaterias from '@/components/Estudiantes/ModalCargarMaterias.vue'
export default {
  data(){
    return{
      active: false, 
    }
  },
  components:{
    ModalCargarMaterias
  },
  methods: {
    ...mapActions({
      getMateriasEstudiante: 'materias/getMateriasEstudiante'
    }),
    handleCargar(materia){
      console.log(materia)
    }
  },
  computed: {
    ...mapState({
      materias: (state) => state.materias.materiasEstudiante,
    }),
    ...mapGetters({
      estudianteTieneMaterias : 'materias/estudianteTieneMaterias',
    })

  },
  async mounted() {
    await this.getMateriasEstudiante()
  },
};
</script>

<style>
</style>