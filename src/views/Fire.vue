<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Fire: {{ name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <strong>Date: </strong> {{ moment(new Date(date)) }}
      </v-col>
      <v-col cols="6">
        <strong>Reporter: </strong>
        {{ !!source && source.id ? source.id : "unknown" }}
      </v-col>
      <v-col cols="6">
        <strong>Position - Latitude: </strong>
        {{ !!position && position.lat ? position.lat : "no data" }}
      </v-col>
      <v-col cols="6">
        <strong>Position - Longitude: </strong>
        {{ !!position && position.lng ? position.lng : "no data" }}
      </v-col>

      <v-col cols="6">
        <strong>Status: </strong>
        <span
          :class="status === 'open' ? 'red--text text--darken-4' : 'green-text'"
          >{{ status.toUpperCase() }}</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <gmap-map
          v-if="name"
          :zoom="13.5"
          :center="position"
          :options="{ styles: gmapStyle }"
          style="width: 100%; height:500px"
        >
          <GmapMarker
            :position="{ lat: userLocation.lat, lng: userLocation.lng }"
            :clickable="true"
          />
          <gmap-polygon
            v-if="!!paths"
            :paths="paths"
            :options="{
              strokeColor: 'red',
              fillColor: 'red'
            }"
          >
          </gmap-polygon>

          <gmap-polygon
            v-if="!!secondPaths"
            :paths="secondPaths"
            :options="polygonStyle"
          >
          </gmap-polygon>
        </gmap-map>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> <Feed :reports="reports" /> </v-col>
      <v-col cols="12">
        <NewsFeedFeeder :fireId="id" :userLocation="userLocation" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import gmapStyle from "../data/gmap-style.json";
import polygonStyle from "../data/polygon-style.json";
import config from "../config/config.json";

export default {
  props: ["id"],
  components: {
    Feed: () => import("@/components/Feed.vue"),
    NewsFeedFeeder: () => import("@/components/NewsFeedFeeder.vue")
  },
  data() {
    return {
      gmapStyle: gmapStyle,
      polygonStyle: polygonStyle,
      userLocation: {
        lat: 52.4052927,
        lng: 16.8658895
      },
      paths: [],
      secondPaths: [[]],

      name: null,
      date: null,
      position: null,
      source: null,
      status: "unknown",
      reports: null,
      refreshIntervalId: null
    };
  },
  methods: {
    sendRequest() {
      axios.get(config.serverIp + "/fire/" + this.id).then(response => {
        console.log(response);
        this.name = response.data.name;
        this.date = response.data.date;
        this.position = response.data.position;
        this.source = response.data.source;
        this.paths = response.data.position.area[0];
        this.secondPaths = response.data.position.area[1];
        this.status = response.data.status;

        axios
          .get(config.serverIp + "/reports?fireId=" + this.id)
          .then(response => {
            console.log(response);
            this.reports = response.data;
          });
      });
    },
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation.lat = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;
      });
    },
    refreshNewsFeed() {
      axios
        .get(config.serverIp + "/reports?fireId=" + this.id)
        .then(response => {
          console.log(response);
          this.reports = response.data;
        });
    }
  },
  mounted() {
    this.getLocation();
    this.sendRequest();
    this.refreshIntervalId = setInterval(this.refreshNewsFeed, 2000);
  },
  destroyed() {
    clearInterval(this.refreshIntervalId);
  }
};
</script>
