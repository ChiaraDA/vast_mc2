<template>
    <div>
        <vue-plotly class="" :data="data" :layout="layout" :options="options"/>
    </div>  
</template>

<script>
import VuePlotly from '@statnett/vue-plotly';

//const d3 = require('d3');

                
export default {
    name: 'mc2_incomeCharts',
    components: {
        VuePlotly
    },
    props: {
        cfAggregation: Array,
    },
    data() {
        return {
            data: [{
                x:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                y:[1,1,1,1,1,1,1],
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
                        text: 'Amount',
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
            this.data[0].y = datum.map(d => d.value.Price);
            this.data[0].x = datum.map(d => d.value.Week_Day);
            this.layout.title.text = "Income of "+datum[0].value.Location; 
        },
        deep: true
    }
}
</script>
