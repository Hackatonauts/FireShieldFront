import moment from 'moment';
<template>
  <v-card v-if="!!reports">
    <v-card-title>
      News Feed
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="!!reports"
      :headers="headers"
      :items="reports"
      :items-per-page="10"
      class="elevation-1"
      :dense="dense"
      multi-sort
      :search="search"
      :key="reports.id"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="flex-grow-1"></div>
          <v-switch
            v-model="dense"
            label="Dense table"
            class="mt-2"
            color="red darken-4"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }" columns>
        <tr>
          <td>{{ item.user }}</td>
          <td>{{ moment(new Date(item.date)) }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.position.lat }}</td>
          <td>{{ item.position.lng }}</td>
          <td>
            <img
              v-if="item.images && item.images[0]"
              :src="config.serverIp + '/' + item.images[0]"
              height="100px"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import moment from "moment";
import config from "../config/config.json";

export default {
  props: ["reports"],
  data() {
    return {
      search: "",
      headers: [
        { text: "User", value: "user" },
        { text: "Date", value: "date" },
        { text: "Descrpition", value: "description" },
        { text: "Latitude", value: "position.lat" },
        { text: "Longitude", value: "position.lng" },
        { text: "Image", value: "images", sortable: false }
      ],
      dense: false,
      config: config
    };
  },
  methods: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    }
  }
};
</script>
