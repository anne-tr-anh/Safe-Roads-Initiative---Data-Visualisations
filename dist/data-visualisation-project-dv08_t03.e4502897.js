const drawStackedBars = (data)=>{
    //chart area
    const svg = d3.select("#stacked_bar").append("svg").attr("viewBox", `0 0 ${width} ${height}`) // responsive svg
    ;
    //inner chart
    const innerChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const stackGenerator = d3.stack().keys(formatsInfo.map((f)=>f.id)).order(d3.stackOrderDescending).offset(d3.stackOffsetExpand);
    const annotatedData = stackGenerator(data);
    xScale.domain(data.map((d)=>d.jurisdiction)).range([
        0,
        innerWidth - 170
    ]).paddingInner(0.2);
    const maxUpperBoundary = d3.max(annotatedData[annotatedData.length - 1], (d)=>d[1]);
    yScale.domain([
        0,
        maxUpperBoundary
    ]).range([
        innerHeight,
        0
    ]).nice();
    colorScale.domain(formatsInfo.map((d)=>d.id)).range(formatsInfo.map((d)=>d.color));
    console.log(annotatedData);
    annotatedData.forEach((series)=>{
        innerChart.selectAll(`.bar-${series.key}`).data(series).join("rect").attr("class", (d)=>`bar-${series.key}`).attr("x", (d)=>xScale(d.data.jurisdiction)).attr("y", (d)=>yScale(d[1])).attr("width", xScale.bandwidth()).attr("height", (d)=>yScale(d[0]) - yScale(d[1])).attr("fill", colorScale(series.key));
    });
    const bottomAxis = d3.axisBottom(xScale);
    innerChart.append("g").attr("transform", `translate(0, ${innerHeight})`).call(bottomAxis);
    const leftAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0%")).ticks(5).tickSizeOuter(0);
    innerChart.append("g").call(leftAxis);
    const legend = svg.append("g").attr("class", "legend").attr("transform", `translate(${width - margin.right - 150}, ${margin.top})`);
    formatsInfo.forEach((format, i)=>{
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
        legendRow.append("rect").attr("width", 15).attr("height", 15).attr("fill", format.color);
        legendRow.append("text").attr("x", 20).attr("y", 12).attr("fill", "#000").text(format.label).style("font-size", "12px");
    });
};

//# sourceMappingURL=data-visualisation-project-dv08_t03.e4502897.js.map
