<template>
  <div>
    <v-data-table
      v-if="!!fires"
      :headers="headers"
      :items="fires"
      :items-per-page="10"
      class="elevation-1"
      :dense="dense"
      :expanded.sync="expandedMachines"
      show-expand
      multi-sort
      :search="search"
      :key="fires.id"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <div class="flex-grow-1"></div>
          <v-switch
            v-model="dense"
            label="Dense table"
            class="mt-2"
            color="red darken-4"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td colspan="5"></td>
      </template>
      <template v-slot:item="{ item }" columns>
        <tr>
          <td></td>
          <td>{{ item.name }}</td>
          <td>{{ moment(new Date(item.date)) }}</td>
          <td>{{ item.position.lat }}</td>
          <td>{{ item.position.lng }}</td>
          <td>
            <v-btn fab small text color="red darken-4" :to="'/fire/' + item.id"
              ><v-icon>mdi-arrow-expand-all</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn
              fab
              small
              text
              color="red darken-4"
              @click="$parent.target(item.position.lat, item.position.lng)"
              ><v-icon>mdi-map-marker-radius</v-icon></v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <div v-else class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="red darken-4"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["fires"],
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      { text: "Date", value: "date" },
      { text: "Latitude", value: "position.lat" },
      { text: "Longitude", value: "position.lng" },
      { text: "Details", sortable: false },
      { text: "Show on map", sortable: false }
    ],
    expandedMachines: [],
    dense: true,
    search: null
  }),
  methods: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    }
  }
};
</script>
