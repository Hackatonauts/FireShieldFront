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
      :headers="headers"
      :items="reports"
      :search="search"
      multi-sort
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["reports"],
  data() {
    return {
      search: "",
      headers: [
        { text: "User", value: "user" },
        { text: "Descrpition", value: "description" },
        { text: "Date", value: "date" }
      ]
    };
  }
};
</script>
