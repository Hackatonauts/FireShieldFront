<template>
  <v-container class="about">
    <v-row>
      <v-col cols="12"> <h1>About our app!</h1> </v-col>
      <v-col cols="12">
        <v-img
          src="https://images-2019.spaceappschallenge.org/team-photos/subgjIjH1VSZFvVqIV6dFerdd50=/9985/fill-1440x600/"
          alt="our team"
        />
        <h4 class="center">Our Team</h4>
        <h4>
          What is FIRESHIELD?
        </h4>
        <p>
          FIRESHIELD is an app that focus on alerting people about nearby fires
          and show them danger zones.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      outTeam: require("../assets/our_team.jpg")
    };
  }
};
</script>
