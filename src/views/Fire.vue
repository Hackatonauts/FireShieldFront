<template>
  <v-container>
    <h1>Fire: {{ id }}</h1>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    sendRequest() {
      axios.get("http://192.168.137.1:8080/fire/" + this.id).then(response => {
        console.log(response);
        axios
          .get("http://192.168.137.1:8080/reports?fireId=" + this.id)
          .then(response => {
            console.log(response);
          });
      });
    }
  },
  mounted() {
    this.sendRequest();
  }
};
</script>
