<template>
  <div>
    <svg viewBox="0 0 720 512" id="abila_map" class="abila_map">
      <g class="trajectories" ref="trajectories" id="trajectories"></g>
    </svg>
    <img src="@/assets/MC2-tourist.jpg" id="img_map" class="img-fluid">

  </div>
</template>

<script>
import BuildingMap from "@/assets/building-map";

const d3 = require("d3");


export default {
  name: "mc2_map",
  mounted() {
    fetch("./json/Abila.geojson")
      .then((response) => response.json())
      .then((map) => {
        const abilaMap = map;
        const building_map = BuildingMap();
        d3.select("#abila_map").datum(abilaMap).call(building_map);
      });
  },
};
</script>
