<template>
  <b-container id="map-container">
     <b-row align-v="stretch" class="b-row">
        <b-col class="b-col p-0" md="12" >
          <div id="range_date_time" class=" align-items-center">
              <div v-bind:class="current_date_time(timeInterval)">Date and Time: {{date_time}}</div>
              <b-form-input class="mt-3" id="time" v-model="timeInterval" type="range" min="0" max="25000" step="1"></b-form-input>
          </div>
        </b-col>
      </b-row>
    <b-row align-v="stretch" class="b-row">
      <b-col class="b-col p-0" xl="8" height="900px">
        <svg viewBox="0 0 720 512" id="abila_map" class="abila_map">
          <g class="trajectories" ref="trajectories"></g>
        </svg>
        <img src="@/assets/MC2-tourist.jpg" id="img_map" class="img-fluid">
      </b-col>
      <b-col class="b-col" xl="4" >
            <b-card bg-variant="light" header="Cars Data" class="text-center">
              <div v-if="selected_cars" id="cars_data" >
                <div class="p-3"><b>{{count_cars}} Cars Selected</b></div>
                <b-card-text v-for="p in persons_car" :key="p.identifier" v-show="p.selected">
                  {{p.last_name}} {{p.first_name}}, <i>{{p.emp_title}}</i>
                </b-card-text>
              </div>
              <div v-else>
                <b-card-text>No Cars Selected</b-card-text>
              </div>
            </b-card>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import BuildingMap from "@/assets/building-map";
import Trajectories from "@/assets/Trajectories";

const d3 = require("d3");
const trajectories = Trajectories();

console.log("D3 Module:", d3);

function euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(a.longitude - b.longitude, 2) + Math.pow(a.latitude - b.latitude, 2));
}

export default {
  name: "mc2_map",
  data() {
    return {
      persons_car: [],
      timeInterval:0,
      selected_cars:false,
      count_cars:0,
      date_time:""
    };
  },
  mounted() {
    fetch("./json/Abila.json")
      .then((response) => response.json())
      .then((map) => {
        const abilaMap = map;
        const building_map = BuildingMap();
        d3.select("#abila_map").datum(abilaMap).call(building_map);
      });

    d3.csv("./csv/car-assignments.csv").then((rows) => {
      const car_data = rows.map((row, i) => {
        const entries = Object.values(row);
        return {
          identifier: i,
          last_name: entries[0],
          first_name: entries[1],
          id_car: entries[2],
          emp_type: entries[3],
          emp_title: entries[4],
        };
      });
      this.persons_car = car_data;
      console.log("Car data:", car_data);
    });

    d3.csv("./csv/gps.csv").then((rows) => {
      const paths = rows.map((row) => ({
        timestamp: row.Timestamp,
        id_car: row.id,
        latitude: parseFloat(row.lat),
        longitude: parseFloat(row.long),
      }));

      console.log("Paths: ", paths);
      const trajs = d3.groups(paths, (d) => d.id_car);

      console.log("Trajs: ", trajs);

      const trs = Object.values(trajs).map((d) => {
        const pl = d[1].map((p, i) => {
          if (i == 0) return 0;
          return euclideanDistance(p, d[1][i - 1]);
        });

        return {
          id_car: d[0],
          values: d[1].map((p) => ({
            latitude: p.latitude,
            longitude: p.longitude,
            timestamp: p.timestamp,
          })),
          path_length: pl.reduce((a, b) => a + b, 0),
          delta_s: pl,
        };

      });

      console.log("Trs: ", trs);

      d3.select(this.$refs.trajectories).datum(trs).call(trajectories);      


    });

    trajectories.on('interval.list', (list) => {
      this.count_cars = 0
      this.selected_cars=true
      const ids = list.map(p => p.id)
      console.log(ids)
      this.persons_car = this.persons_car.map(p => {

        if (ids.indexOf(p.id_car) >= 0) {
          this.count_cars = this.count_cars+1
          return {
            ...p,
            selected:true
          }
        }
        return {
          ...p,
          selected:false
        }
      })
    })
  },
  methods:{
    current_date_time: function (value) {
          const start = new Date(2014, 0, 6, 7, 28, 1)
          const end = new Date(2014, 0, 19, 21, 56, 55)
          const timeScale = d3.scaleTime()
              .domain([start, end])
              .range([0, 25000])
          const date = timeScale.invert(value)
          this.date_time = d3.timeFormat("%B %d, %Y - %H:%m:%S")(date)
      }
  },
  watch: {
    timeInterval(newVal) {
      const interval = [Math.max(0, newVal - 10), newVal];
      trajectories.timeExtent(interval);
      d3.select(this.$refs.trajectories).call(trajectories);
    },
  },
};
</script>

<style>

.b-col{
  margin-top:20px;
}

#map-container {
  height: fit-content;
  width: 100%;
  max-width: 100%;
  position: relative;
}

#abila_map {
  max-width: 100%;
  max-height: 100%;
}

#img_map {
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width:100%;
}

#cars_data{
  overflow:scroll;
  height:auto;
  max-height:430px;
}

svg g.trajectories path {
  stroke: #262626
}

svg g.trajectories path.selected {
  stroke: red
}

</style>