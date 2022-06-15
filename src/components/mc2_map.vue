<template>
    <div>
        <svg width="720" height="520" id="abila_map">
        </svg>
    </div>
</template>

<script>
//import buildingMap from '@/assets/building_map';
const d3 = require('d3');

export default {
    name: "mc2_map",
    mounted() {
        fetch("./json/Abila.json")
            .then(response => response.text())
            .then((map) => {
                var width = 720
                var height = 520
                var abila_map = JSON.parse(map);
                var projection = d3.geoMercator().fitSize([width, height], abila_map);
                var path = d3.geoPath().projection(projection);

                var svg = d3.select("#abila_map")

                svg.selectAll("path")
                    .data(abila_map.features)
                    .enter()
                    .append("path")
                    .attr( "fill", "#ccc" )
                    .attr( "stroke", "#333")
                    .attr("d", path);

                return svg.node()
            })
        
            

        
    }
}


</script>