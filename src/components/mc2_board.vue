<template>
    <b-container id="board" class="board">
        
        <b-row align-v="stretch" class="b-row pl-4 pr-4">
            <b-col class="b-col p-0" md="4" >
              <div id="step_minute" class="align-items-center">
                  <p>Enter a Value to Increase the Time <b>Faster</b></p>
                  <b-form-input v-model="step" type="number" :state="nameState" min="1" max="24713"></b-form-input>
              </div>
            </b-col>
        </b-row>
        <b-row align-v="stretch" class="b-row pl-4 pr-4">
            <b-col class="b-col p-0" md="12" >
              <div id="date_time" class=" align-items-center">
                  <b-form-spinbutton ref="time" v-model="timeInterval" :formatter-fn="current_date_time" :step="step" max="24713" :disabled="block_time"></b-form-spinbutton>
              </div>
            </b-col>
        </b-row>
        <b-row id="map_row" align-v="stretch" class="b-row">
            <b-col class="b-col map" xl="8" height="900px" ><mc2_map/></b-col>
            <b-col class="b-col" xl="4" ><mc2_carsData ref="cars_data"/></b-col>
        </b-row>

        <b-row id="charts_row1" align-v="stretch" class="b-row mt-5">
            <b-col class="b-col" md="4">
              <h5>Locations List</h5>
                <b-list-group id="location_list">
                <b-list-group-item ref="locations_list" v-for="(location,i) in locations" :key="i" :class="{active:location === activeItem}" @click="get_location(location)"  button>{{location}}</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col class="b-col" md="4">
              <mc2_cardsData ref="cards_data"></mc2_cardsData>
            </b-col>
            <b-col class="b-col" md="4">
              <b-card bg-variant="light" header="Payment Methods Distribution" class="text-center">
                  <b-card-text><mc2_cardsCharts :cfAggregation="cards_data_active"></mc2_cardsCharts></b-card-text>
              </b-card>
            </b-col>
        </b-row>

        <b-row id="charts_row2" align-v="stretch" class="b-row mt-5">
            <b-col class="b-col" md="12">
              <b-card bg-variant="light" header="Locations Popularity" class="text-center">
                <b-card-text><mc2_locPopCharts :cfAggregation="pop_location"></mc2_locPopCharts></b-card-text>
              </b-card>
            </b-col>
        </b-row>


    </b-container>
</template>

<script>
import mc2_map from '@/components/mc2_map.vue';
import mc2_carsData from '@/components/mc2_carsData.vue';
import mc2_locPopCharts from '@/components/mc2_locPopCharts.vue';
import mc2_cardsCharts from '@/components/mc2_cardsCharts.vue';
import mc2_cardsData from '@/components/mc2_cardsData.vue';
import Trajectories from "@/assets/Trajectories";
import crossfilter from 'crossfilter';

const trajectories = Trajectories();

function euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(a.longitude - b.longitude, 2) + Math.pow(a.latitude - b.latitude, 2));
}

const d3 = require('d3')
console.log("D3 Module:", d3);

let cf;
let dWeekPop;
let dLocations;
let dCards;
let array_of_cards;

export default {
  name: 'mc2_board',
  components: {
    mc2_map,
    mc2_locPopCharts,
    mc2_carsData,
    mc2_cardsCharts,
    mc2_cardsData,
  },
  data() {
    return {
        timeInterval:0,
        date_time:String,
        locations:[],
        location_days:{},
        activeItem: String,
        pop_location:[],
        step:1,
        cards_data: [],
        cards_data_active: [],
    }
  },
  mounted() {
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
      this.$refs.cars_data.persons_car = car_data;
      console.log("Car data:", car_data);
    });

    d3.csv("./csv/gps.csv").then((rows) => {
      const paths = rows.map((row) => ({
        timestamp: row.Timestamp,
        id_car: row.id,
        latitude: +row.lat,
        longitude: +row.long,
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
          })),
          path_length: pl.reduce((a, b) => a + b, 0),
          delta_s: pl,
        };

      });

      console.log("Trs: ", trs);
      d3.select("#trajectories").datum(trs).call(trajectories);      


    });

    trajectories.on('interval.list', (list) => {
      this.$refs.cars_data.count_cars = 0
      this.$refs.cars_data.selected_cars=true
      const ids = list.map(p => p.id)
      console.log(ids)
      this.$refs.cars_data.persons_car = this.$refs.cars_data.persons_car.map(p => {
        console.log(this.$refs.cars_data.persons_car)
        if (ids.indexOf(p.id_car) >= 0) {
          this.$refs.cars_data.count_cars = this.$refs.cars_data.count_cars+1
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
    

    Promise.all([
      d3.csv("./csv/cc_data.csv"),
      d3.csv("./csv/loyalty_data.csv")
    ]).then(([cc_rows, lc_rows]) => {
        const cc_data = cc_rows.map((d) => {
            const dateFormat = d3.timeParse("%m/%d/%Y %H:%M");
            const thisDate = dateFormat(d.timestamp);
            const date = new Date(thisDate);
            const format_weekD = d3.timeFormat("%A")
            const format_day = d3.timeFormat("%B %d, %Y")
            const final_weekD = format_weekD(date)
            const final_day = format_day(date)
            const credit_card_data = {
                Day: final_day,
                DayTime: d.timestamp,
                Week_Day: final_weekD,
                Location: d.location,
                Price: +d.price,
                Last4cc: d.last4ccnum
            }
            return credit_card_data;
        });
        console.log("ALL CC", cc_data)

        const lc_data = lc_rows.map((d) => {
            const dateFormat = d3.timeParse("%m/%d/%Y");
            const thisDate = dateFormat(d.timestamp);
            const date = new Date(thisDate);
            const format_weekD = d3.timeFormat("%A")
            const format_day = d3.timeFormat("%B %d, %Y")
            const final_weekD = format_weekD(date)
            const final_day = format_day(date)
            const loyalty_card_data = {
                Day: final_day,
                DayTime: d.timestamp,
                Week_Day: final_weekD,
                Location: d.location,
                Price: +d.price,
                Card_number: d.loyaltynum
            }
            return loyalty_card_data;
        });
        console.log("ALL CF", lc_data)

        let cc_cf = []
        let cc_new = []
        let lc_new = []
        
        Object.values(cc_data).forEach(d => Object.values(lc_data).forEach(f => {
            if(d.Location == f.Location && d.Day == f.Day && f.Price == d.Price){
              cc_data.splice(cc_data.indexOf(d),1);
              lc_data.splice(lc_data.indexOf(f),1);
              d.lc_number = f.Card_number
              cc_cf.push(d)
            } else {
              d.category = "CC"
              f.category = "Cash"
            }
          })
        )

        cc_cf.map(d => d.category = "Both")
        cc_new = cc_data
        lc_new = lc_data
        console.log("CC", cc_new)
        console.log("CF", lc_new)
        console.log("CF AND CC", cc_cf)

        array_of_cards = [...cc_new, ...lc_new, ...cc_cf];
        console.log("All cards data", array_of_cards)

        cf = crossfilter(array_of_cards);

        dLocations = cf.dimension(d => d.Location);

        this.locations = dLocations.group().reduceCount().all().map(d => d.key);
        console.log(this.locations)

        const days = {'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,'Sunday': 7};

        dWeekPop = cf.dimension(function (d) {
          return JSON.stringify ( { location: d.Location , week_day: d.Week_Day } ) ;
        });

        const group = dWeekPop.group();
        group.all().forEach(function(d) {
          d.key = JSON.parse(d.key);
        });
        const location_days = group.all();

        location_days.sort((a, b) => {
          return days[a.key.week_day] - days[b.key.week_day];
        });

        this.location_days = location_days
        
        console.log("Location and Days", location_days)

        dCards = cf.dimension(function (d) {
          return JSON.stringify ( { location: d.Location, category: d.category , day: d.Day } ) ;
        });
        const group_cards = dCards.group();
        group_cards.all().map(function(d) {
          d.key = JSON.parse(d.key);
        });
        const cat_days = group_cards.all();
        
        this.cards_data = cat_days
        console.log("Cards data", this.cards_data)
        

      });
    
  },
  computed:{
    nameState(){
      return this.step >= 1 && this.step <= 24713 ? true : false;
    },
    
    block_time() {
      return this.step < 1 || this.step > 24713  ? true : false
    },
  },
  methods:{
    current_date_time(value) {
      const start = new Date(2014, 0, 6, 6, 28)
      const end = new Date(2014, 0, 19, 21, 56)
      const timeScale = d3.scaleTime()
          .domain([start, end])
          .range([0, 24713])
      const date = timeScale.invert(value)
      this.date_time = d3.timeFormat("%B %d, %Y - %H:%M")(date)
      return this.date_time;
    },
    get_location(loc) {
      this.activeItem = loc
      this.activeItem = loc;

      const activeItem_getDataLoc = this.location_days.filter(d => (d.key.location == this.activeItem));
      console.log("Active Item Data", activeItem_getDataLoc)
      this.pop_location = activeItem_getDataLoc

      const activeItem_getDataCards = this.cards_data.filter(d => (d.key.day == this.date_time.split(" -")[0] && d.key.location == this.activeItem));
      console.log("Active Item Data Cards", activeItem_getDataCards)
      this.cards_data_active = activeItem_getDataCards

      const activeItem_ccDetails = array_of_cards.filter(d => d.Location == this.activeItem && d.Day == this.date_time.split(" -")[0] && d.category == "CC");
      console.log("Active Item Cc Details", activeItem_ccDetails)
      this.$refs.cards_data.cc_details = activeItem_ccDetails

      const activeItem_cashDetails = array_of_cards.filter(d => (d.Day == this.date_time.split(" -")[0] && d.Location == this.activeItem && d.category == "Cash"));
      this.$refs.cards_data.cash_details = activeItem_cashDetails

      const activeItem_bothDetails = array_of_cards.filter(d => (d.Day == this.date_time.split(" -")[0] && d.Location == this.activeItem && d.category == "Both"));
      this.$refs.cards_data.both_details = activeItem_bothDetails
    }
  },
  watch: {
    timeInterval(newVal) {
      const interval = [Math.max(0, newVal-10), newVal];
      trajectories.timeExtent(interval);
      d3.select("#trajectories").call(trajectories);
      console.log(this.timeInterval)
    },
  },
}
</script>

<style>
#board{
  margin-top:30px;
}

.b-col{
  margin-top:15px;
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
  padding-left:10px;
  padding-right:10px;
}

#cars_data{
  overflow:scroll;
  overflow-x:hidden;
  height:auto;
  max-height:500px;
}

svg g.trajectories path {
  stroke: blue
}

svg g.trajectories path.selected {
  stroke: red
}

#location_list{
  overflow:scroll;
  overflow-x:hidden;
  height:315px;
}

#cards_details {
  overflow:scroll;
  overflow-x:hidden;
  height:315px;
}

.generic_details_cc{
  background-color: #FF8800;
}

.generic_details_cash{
  background-color: #2e7d32;
}

.generic_details_both{
  background-color: #1565c0 ;
}

</style>