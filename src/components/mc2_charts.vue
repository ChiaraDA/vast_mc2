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
                x:["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
                y:[0,0,0,0,0,0,0],
            }],
            layout: {
                height:250,
                showlegend: false,
                title: {
                    text: "",
                    font: {
                        family: 'Quicksand, monospace',
                        size: 24
                    },
                    xref: 'paper',
                    x: 0.05,
                },
                xaxis: {
                    title: {
                        text: 'Days of the Week',
                        font: {
                            family: 'Quicksand, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    },
                },
                yaxis: {
                    title: {
                        text: 'Count',
                        font: {
                            family: 'Quicksand, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
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
            this.data[0].y = datum.map(d => d.value);
            this.data[0].x = datum.map(d => d.key.week_day);
            this.layout.title.text = "Popularity of "+datum[0].key.location; 
        },
        deep: true
    }
}
</script>
