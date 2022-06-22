<template>
    <b-container id="charts-container"  class="b-container">
        <b-row align-v="stretch" class="b-row">
            <b-col class="pt-3 justify-content-center" lg="4" >
                <b-card border-variant="light" header="10 Most Popular Locations" class="text-center">
                    <b-card-text><vue-plotly class="" :data="data" :layout="layout" :options="options"/></b-card-text>
                </b-card>
            </b-col>
            <b-col class="pt-3 justify-content-center" lg="4" >
                <b-card border-variant="light" header="When the Locations are More Popular" class="text-center">
                    <b-card-text><vue-plotly class="" :data="data" :layout="layout" :options="options"/></b-card-text>
                </b-card>
            </b-col>
            <b-col class="pt-3 justify-content-center" lg="4" >
                <b-card border-variant="light" header="Type of Payment" class="text-center">
                    <b-card-text><vue-plotly class="" :data="data" :layout="layout" :options="options"/></b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly';



export default {
    name: 'mc2_charts',
    components: {
        VuePlotly
    },
    props: {
        cfAggregation: Array,
    },
    data() {
        return {
            data: [{
                type: 'bar',
                x:[1,10], 
                y: [2,10],
                orientation: 'h'
            }],
            layout: {
                height:250,
                margin: {
                    t: 10,
                    l: 30,
                    b: 30,
                    r: 30,
                    pad:5
                }
            },
            options: {
                displayModeBar: false,
            }
        }
    },
    watch: {
        cfAggregation(datum) {
            
            this.data[0].y = datum.map(d => d.key)
            this.data[0].x = datum.map(d => d.value)
        }
    }
}
</script>
