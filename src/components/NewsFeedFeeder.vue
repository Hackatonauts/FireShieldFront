import axios from 'axios';
<template>
  <v-layout>
    <v-row>
      <v-col col="12">
        <v-textarea
          color="red"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-newspaper-variant"
          label="Description"
          rows="1"
          v-model="description"
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <v-btn v-on:click="sendRequest" color="red">
          ADD FIRE<v-icon>mdi-fire</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import axios from "axios";

export default {
  props: ["fireId", "userLocation"],
  data() {
    return {
      description: null
    };
  },
  methods: {
    sendRequest() {
      axios
        .post("http://192.168.137.1:8080/report/", {
          fireId: this.fireId,
          description: this.description,
          images: [],
          user: "John Doe",
          position: {
            lat: this.userLocation.lat,
            lng: this.userLocation.lng
          }
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>
