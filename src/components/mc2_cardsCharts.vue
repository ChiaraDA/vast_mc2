<template>
    <div>
        <h5>{{title}}</h5>
        <vue-plotly class="" :data="data" :layout="layout" :options="options"/>
    </div>  
</template>

<script>
import VuePlotly from '@statnett/vue-plotly';

//const d3 = require('d3');

                
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
                labels:["Credit Card", "Cash", "Credit Card and Loyalty Card"],
                values:[0,0,0],
                type:"pie",
                hole:.4,
                textinfo: "label+percent",
            }],
            layout: {
                height: 250,
                margin: {"t": 40, "b": 40, "l": 40, "r": 40},
                showlegend: false,
                title: {
                    text: "",
                    font: {
                        family: 'Quicksand, monospace',
                        size: 13
                    },
                },
            },
            options: {
                displayModeBar: false,
            },
        }
    },
    watch: {
        cfAggregation(datum) {
            this.data[0].values = datum.map(d => d.value);
            this.data[0].labels = datum.map(d => d.key.category)
            this.layout.title.text = datum[0].key.location + ", " + datum[0].key.day; 
            console.log(this.layout.title.text)
        },
        deep: true
    }
}
</script>
