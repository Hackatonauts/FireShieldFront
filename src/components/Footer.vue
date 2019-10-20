<template>
  <v-footer dark>
    <v-card flat tile class="grey darken-4 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="link in socialMedia"
          :key="link.icon"
          class="mx-4 white--text"
          icon
          :href="link.link"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-row>
        <v-col cols="12" class="px-5">
          <v-card-text class="white--text pt-0 text-left">
            <span class="red--text text--darken-4">FIRE</span>SHILED is wild
            fires tracking app and can help you in emergency situations like
            wild fires and hurricanes. It also can guide you how to get to
            nearest hospital or evacuation point.
          </v-card-text>
        </v-col>
      </v-row>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>&copy;FireShield Team </strong
        ><a
          href="mailto:wojciech.kasperski97@gmail.com"
          class="font-weight-light white--text"
          >&lt;wojciech.kasperski97@gmail.com&gt;</a
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    logo: require("../assets/logo.png"),
    socialMedia: [
      {
        icon: "mdi-github-circle",
        link: "https://github.com/SuddenlyPineapple"
      }
    ]
  })
};
</script>
