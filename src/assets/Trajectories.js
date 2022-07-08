const d3 = require('d3')

export default function Trajectories() {
    let container;
    let paths;
    let brush_area;

    const dispatch = d3.dispatch('interval')
    
    const x = d3.scaleLinear()
    .domain([24.82508806, 24.90848537])
    .range([15, 720-15])

    const y = d3.scaleSqrt()
    .domain([36.04802098, 36.08995956])
    .range([512-28, 28])

    const path = d3.line()
        .x(d => x(d.longitude))
        .y(d => y(d.latitude));

    function isWithin (p, e) {
        return ((p.longitude >= e[0][0]) && (p.longitude <= e[1][0]) && (p.latitude >= e[1][1]) && (p.latitude <= e[0][1]))
    }
    

    function brushended(event) {
        if (!event.selection) {
            return;
        }
    

        function extent_function (event){
            const extent = event.selection.map(c => [x.invert(c[0]), y.invert(c[1])])
            return extent
        }
        

        const list = [];
        container.datum().forEach(p => {
            if(Object.keys(p.values).length >= timeExtent[1]){
                const point = p.values[timeExtent[1]-1]
                if (isWithin(point, extent_function(event))) {
                    list.push({
                        id: p.id_car,
                    })
                }
            }
            return list;
        });
        dispatch.call('interval', this, list)
    }

    const brush = d3.brush()
        .on('end', brushended)

    let timeExtent = [0, 1]

    function me(selection) {

        container = selection;

        paths = container.selectAll('path')
            .data(container.datum(), d => d.id_car)

        
        paths = paths
            .enter()
            .append('path')
            .merge(paths)
            .attr('stroke-width', 2)
            .attr('stroke', '#262626')
            .attr('fill', 'none')

        redraw(paths)

        brush_area = container.append('g')
            .attr('class', 'brush')
            .call(brush)

        dispatch.on('interval.trajs', (list) => {
            const cars = container.datum()
            const ids = list.map(d => d.id)
            
            cars.forEach(p => {
                if (ids.indexOf(p.id_car) >= 0) {
                    p.selected = true
                } else {
                    p.selected = false
                }
            })
            redraw(paths);
        })
    }

    function redraw(paths) {
        paths.classed('selected', d => d.selected)
            .attr('d', d => {
                if(path(d.values.slice(timeExtent[0], timeExtent[1])) != null){
                    return (`${path(d.values.slice(timeExtent[0], timeExtent[1]))}m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `)
                }
            })
    }

    me.on = function (eventType, handler) {
        dispatch.on(eventType, handler)
        return me;
    }

    me.timeExtent = function _timeExtent(_) {
        brush_area.call(brush.move, null);
        if (!arguments.length) return timeExtent;
        timeExtent = _;

        paths.attr('d', d => {
            if(path(d.values.slice(timeExtent[0], timeExtent[1])) != null){
                return (`${path(d.values.slice(timeExtent[0], timeExtent[1]))}m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 `)
            }
        })
        

        return me;
    }

    return me;
}