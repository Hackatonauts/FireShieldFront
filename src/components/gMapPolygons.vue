<template>
  <gmap-map
    :zoom="14.5"
    :center="center"
    :options="{ styles: gmapStyle }"
    style="width: 100%; height:500px"
  >
    <GmapMarker :position="{ lat: lat, lng: lng }" :clickable="true"/>
    <gmap-polygon
      v-bind:paths="paths"
      :editable="true"
      @paths_changed="updateEdited($event)"
      :options="polygonStyle"
    >
    </gmap-polygon
  ></gmap-map>
</template>

<script>
import gmapStyle from "../data/gmap-style.json";
import polygonStyle from "../data/polygon-style.json";

export default {
  name: "MapPolygons",
  props: ["lat", "lng", "paths"],
  data() {
    return {
      center: { lat: 52.4052927, lng: 16.8658895 },
      polygonStyle: polygonStyle,
      gmapStyle: gmapStyle,
      edited: null
    };
  },
  methods: {
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
    }
  }
};
</script>
