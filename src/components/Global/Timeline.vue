<template>
  <v-timeline
    align-top
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="title">
          {{item.title}}
        </v-card-title>
        <v-card-text class=" text--primary">
          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
          <!-- <v-btn
            :color="item.color"
            class=" white mx-0"
            outlined
          >
            Button
          </v-btn> -->
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-bus-school',
          title: 'Cuatrimestre Finalizado',
          descripcion: ''
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-chair-school',
          title: 'Actualmente en Curso',
          descripcion: ''
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-school',
          title: 'Carga de Materias',
          descripcion: ''
        },
        {
          color: 'indigo',
          icon: 'mdi-currency-usd',
          title: 'Pago de Colegiatura',
          descripcion: ''
        },
      ],
    }),
  }
</script>