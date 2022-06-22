const d3 = require('d3')

export default function buildingMap() {
    function me(selection){
        let width = 720
        let height = 512
        let projection = d3.geoMercator().fitSize([width, height], selection.datum());
        let path = d3.geoPath().projection(projection);


        selection.selectAll("path")
            .data(selection.datum().features)
            .enter()
            .append("path")
            .attr( "fill", "#ccc" )
            .attr( "stroke", "#262626")
            .attr("d", path)
            .attr("opacity","0.1")


    }
    return me
}
