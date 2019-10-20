<template>
  <div>
    <gmap-map
      :zoom="14.5"
      :center="center"
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
    <v-container>
      <h1>Fire List:</h1>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Radius (in m, default = 10 000 m, max: 40 000 000)"
            v-model="radius"
            v-on:keyup="refreshList"
            counter="10"
          >
          </v-text-field>
          <v-select
            :items="['open', 'all', 'closed']"
            v-model="status"
            v-on:change="refreshList"
            label="Status (open, closed, all)"
          ></v-select>
        </v-col>
      </v-row>
      <FireList :fires="fires" />
    </v-container>
  </div>
</template>

<script>
import gmapStyle from "../data/gmap-style.json";
import polygonStyle from "../data/polygon-style.json";
import axios from "axios";
import config from "../config/config.json";

export default {
  components: {
    FireList: () => import("@/components/FireList.vue")
  },
  data: () => ({
    center: { lat: 52.4052927, lng: 16.8658895 },
    gmapStyle: gmapStyle,
    polygonStyle: polygonStyle,
    userLocation: {
      lat: 52.4052927,
      lng: 16.8658895
    },
    fires: null,
    paths: [],
    edited: null,
    radius: null,
    status: null,
    secondPaths: [[]]
  }),
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;
      });
    },
    target(lat, lng) {
      this.center.lat = lat;
      this.center.lng = lng;
    },
    getFireList() {
      const range = this.radius ? this.radius : 10000;
      const status = this.status ? this.status : "open";
      axios
        .get(
          config.serverIp +
            "/fires?lat=" +
            this.userLocation.lat +
            "&lng=" +
            this.userLocation.lng +
            "&radius=" +
            range +
            "&status=" +
            status
        )
        .then(response => {
          if (response.status == "204") this.fires = [];
          else this.fires = response.data.fires;

          this.paths = null;
          this.paths = [];
          this.secondPaths = null;
          this.secondPaths = [];

          console.log(response);

          if (this.fires)
            for (let element of this.fires) {
              this.paths.push(element.position.area[0]);
              this.secondPaths.push(element.position.area[1]);
            }
          console.log(this.berlinPaths);
          console.log(this.paths);
        });
    },
    updateEdited(mvcArray) {
      let paths = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        let path = [];
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      this.edited = paths;
    },
    refreshList() {
      this.getFireList();
    }
  },
  created() {
    this.getLocation();
    this.getFireList();
  }
};
</script>
