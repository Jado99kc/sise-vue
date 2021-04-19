<template>
  <div>
    <div class="pa-2">
      <h4 class="text-h5">Cuatrimestre Actual</h4>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Materia</th>
            <th class="text-left">Promedio Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in calificaciones" :key="index">
            <td>{{ item.materia }}</td>
            <td>{{ item.promedio }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- segunda tabla -->

     <div class="pa-2">
      <h4 class="text-h5">Cuatrimestre Pasado</h4>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Materia</th>
            <th class="text-left">Promedio Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in calificaciones" :key="index">
            <td>{{ item.materia }}</td>
            <td>{{ item.promedio }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      calificaciones: [
        {
          materia: "Inteligencia Artificial",
          promedio: 9.0,
        },
        {
          materia: "Teoria de Colores",
          promedio: 8.5,
        },
        {
          materia: "Programacion Movil I",
          promedio: 7,
        },
        {
          materia: "Programacion Web",
          promedio: 10,
        },
      ],
    };
  },
};
</script>