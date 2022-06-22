<template>
    <div>
        <b-card bg-variant="light" header="Cars Data" class="text-center" id="cars_data" >
            <div v-if="selected_cars" class="pb-5" >
            <div class="p-3"><b>{{count_cars}} Cars Selected</b></div>
            <b-card-text v-for="p in persons_car" :key="p.identifier" v-show="p.selected">
                {{p.last_name}} {{p.first_name}}, <i>{{p.emp_title}}</i>
            </b-card-text>
            </div>
            <div v-else>
            <b-card-text>No Cars Selected</b-card-text>
            </div>
        </b-card>
    </div>
</template>

<script>

//const d3 = require("d3");


export default {
  name: "mc2_map",
  data() {
    return {
      persons_car: [],
      selected_cars:false,
      count_cars:0,
    };
  },
  mounted() {
    console.log(this.persons_car)
  }
}
</script>