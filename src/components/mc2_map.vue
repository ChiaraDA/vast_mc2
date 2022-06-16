<template>
    <div id="map-container" >
        <svg viewBox="0 0 720 512" id="abila_map" class="overlay-wrapper">
        </svg>
        <img src="@/assets/MC2-tourist.jpg" id="img_map" class="img-fluid">
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
                let width = 720
                let height = 512
                let abila_map = JSON.parse(map);
                let projection = d3.geoMercator().fitSize([width, height], abila_map);
                let path = d3.geoPath().projection(projection);

                let svg = d3.select("#abila_map")

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

<style>
.incident {
    fill : steelblue;
    stroke : none;
    opacity : 0.5;
}

#label {
    position: absolute;
    left: 10px;
    font-weight: 100;
    font-family: "Proxima Nova", "Montserrat", sans-serif;
}

.hover {
    fill: yellow;   
}


#map-container{
    height:auto;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    position:relative;
}

#abila_map{
    max-width:100%;
    max-height: 100%;
}

#img_map{
    position:absolute;
    top:0;
    left:0;
    opacity: 0.8;
    max-width:100%;
    max-height: 100%;
    height:525px;
}

</style>