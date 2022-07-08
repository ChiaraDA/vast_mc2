<template>
    <div>
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
                labels:["No Data"],
                values:[100],
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
                    xref: 'paper',
                },
            },
            options: {
                displayModeBar: false,
            },
        }
    },
    watch: {
        cfAggregation(datum) {
            if(Object.keys(datum).length != 0){
                this.data[0].values = datum.map(d => d.value);
                this.data[0].labels = datum.map(d => d.key.category)
                this.layout.title.text = datum[0].key.location + ", " + datum[0].key.day;
            } else {
                this.layout.title.text="No Data"
                this.data[0].values = null
                this.data[0].labels = null

            }
            
        },
        deep: true
    }
}
</script>
