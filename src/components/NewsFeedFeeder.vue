import axios from 'axios';
<template>
  <v-layout>
    <v-row>
      <v-col col="12">
        <v-textarea
          color="red darken-4"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-newspaper-variant"
          label="Description"
          rows="1"
          v-model="description"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Fire photo"
          prepend-icon="mdi-camera"
          v-model="file"
          label="Send fire photo"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-btn
          v-on:click="sendRequest"
          color="red darken-4"
          class="white--text"
        >
          ADD FIRE<v-icon>mdi-fire</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import axios from "axios";
import config from "../config/config.json";

export default {
  props: ["fireId", "userLocation"],
  data() {
    return {
      description: null,
      file: null
    };
  },
  methods: {
    sendRequest() {
      axios
        .post(config.serverIp + "/report/", {
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
          console.log("Report: ", response);

          if (this.file) {
            var formData = new FormData();
            formData.append("image", this.file);
            formData.append("reportId", response.data.id);

            axios
              .post(config.serverIp + "/report/img", formData, {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
              })
              .then(response => {
                console.log("Image: ", response);
              });
          }

          this.$router.push({ path: "/fire/" + response.data.fireId });
        });
    }
  }
};
</script>
