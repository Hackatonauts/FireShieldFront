<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Report Fire</h1>
        </v-col>
        <v-col cols="12">
          <v-text-field
            color="red darken-4"
            clearable
            clear-icon="mdi-close-circle"
            prepend-icon="mdi-pen"
            counter="40"
            label="Name"
            v-model="name"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu1 = false"
              color="red darken-4"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Picker in menu"
                prepend-icon="mdi-clock"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              color="red darken-4"
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
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
      </v-row>
      <v-row>
        <v-col col="12">
          <gmap-map
            :zoom="14.5"
            :center="center"
            :options="{ styles: gmapStyle }"
            style="width: 100%; height:500px"
          >
            <GmapMarker
              :position="{ lat: userLocation.lat, lng: userLocation.lng }"
              :clickable="true"/>
            <GmapPolygon
              v-if="paths"
              :paths="paths"
              :editable="true"
              @paths_changed="updateEdited($event)"
              :options="polygonStyle"
            >
            </GmapPolygon
          ></gmap-map>
        </v-col>
        <v-col cols="12">
          <v-btn
            v-on:click="sendPostRequest"
            color="red darken-4"
            class="white--text"
            >ADD FIRE<v-icon>mdi-fire</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import gmapStyle from "../data/gmap-style.json";
import polygonStyle from "../data/polygon-style.json";
import axios from "axios";
import config from "../config/config.json";

export default {
  data: vm => ({
    name: null,
    time: moment(new Date()).format("hh:mm:ss"),
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,

    center: { lat: 52.4052927, lng: 16.8658895 },
    gmapStyle: gmapStyle,
    polygonStyle: polygonStyle,
    userLocation: {
      lat: 52.4052927,
      lng: 16.8658895
    },
    paths: [
      [
        { lat: 52.4032927, lng: 16.8858895 },
        { lat: 52.4092927, lng: 16.8658895 },
        { lat: 52.4032927, lng: 16.8688895 },
        { lat: 52.4052927, lng: 16.8758895 }
      ]
    ],
    edited: null,

    description: null,
    file: null
  }),

  watch: {
    // eslint-disable-next-line no-unused-vars
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;

        this.userLocation.lat = position.coords.latitude;
        this.userLocation.lng = position.coords.longitude;

        this.setPolygon(position.coords.latitude, position.coords.longitude);
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
    setPolygon(lat, lng) {
      this.paths = null;
      this.paths = [
        [
          { lat: 52.4032927, lng: 16.8858895 },
          { lat: 52.4092927, lng: 16.8658895 },
          { lat: 52.4032927, lng: 16.8688895 },
          { lat: 52.4052927, lng: 16.8758895 }
        ]
      ];
      this.paths[0][0].lat = lat - 0.002;
      this.paths[0][0].lng = lng - 0.0035;

      this.paths[0][1].lat = lat + 0.002;
      this.paths[0][1].lng = lng - 0.0035;

      this.paths[0][2].lat = lat + 0.002;
      this.paths[0][2].lng = lng + 0.0035;

      this.paths[0][3].lat = lat - 0.002;
      this.paths[0][3].lng = lng + 0.0035;

      //console.log(this.paths[0][0]);
    },
    sendPostRequest() {
      const fireArea = this.edited ? this.edited : this.paths;

      const eventOccured = new Date(this.date + " " + this.time).toISOString();

      axios
        .post(config.serverIp + "/fire", {
          name: this.name,
          date: eventOccured,
          source: {
            type: "USER",
            id: "front"
          },
          position: {
            lat: this.userLocation.lat,
            lng: this.userLocation.lng,
            area: fireArea
          }
        })
        .then(response => {
          console.log("Fire: ", response);

          axios
            .post(config.serverIp + "/report/", {
              fireId: response.data.id,
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
        });
    }
  },
  mounted() {
    this.getLocation();
  }
};
</script>
