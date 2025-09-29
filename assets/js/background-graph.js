document.addEventListener('DOMContentLoaded', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "fixed")
        .style("top", 0)
        .style("left", 0)
        .style("z-index", -1)
        .style("pointer-events", "none");

    const nodes = d3.range(100).map(function(i) {
        return {id: i};
    });

    const links = d3.range(nodes.length - 1).map(function(i) {
        return {
            source: Math.floor(Math.random() * nodes.length),
            target: Math.floor(Math.random() * nodes.length)
        };
    });

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line");

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", "#666");

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }
});
