// line-chart.js
// 1) Transform raw data into monthly series per DETECTION_METHOD,
//    evenly distributing QLD’s annual fines across 12 months.
function transformToLineChartData(data) {
    const qldTotals = d3.rollup(data.filter((d)=>d.JURISDICTION === "QLD" && d.METRIC === "speed_fines"), (v)=>d3.sum(v, (d)=>+d.FINES), (d)=>d.DETECTION_METHOD);
    const qldMonthly = new Map();
    for (const [m, total] of qldTotals.entries())qldMonthly.set(m, total / 12);
    const nonQld = data.filter((d)=>d.METRIC === "speed_fines" && d.JURISDICTION !== "QLD");
    const months = Array.from(new Set(data.map((d)=>d.START_DATE))).sort((a, b)=>new Date(a) - new Date(b));
    return months.map((dateStr)=>{
        const entry = {
            date: new Date(dateStr)
        };
        // sum non-QLD fines by method
        const sums = d3.rollup(nonQld.filter((d)=>d.START_DATE === dateStr), (v)=>d3.sum(v, (d)=>+d.FINES), (d)=>d.DETECTION_METHOD);
        for (const [m, s] of sums.entries())entry[m] = s;
        // add QLD share
        for (const [m, share] of qldMonthly.entries())entry[m] = (entry[m] || 0) + share;
        return entry;
    });
}
// 2) Draw the chart + hard-coded 20 k-step Y axis + tooltip
function drawLineChart(data) {
    // clear old
    d3.select("#line_chart").selectAll("*").remove();
    const margin = {
        top: 40,
        right: 180,
        bottom: 50,
        left: 60
    };
    const W = 900, H = 450;
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;
    // svg container
    const svg = d3.select("#line_chart").append("svg").attr("viewBox", `0 0 ${W} ${H}`);
    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    // methods = keys except “date”
    const methods = Object.keys(data[0]).filter((k)=>k !== "date");
    // X axis: one tick per month
    const x = d3.scaleTime().domain(d3.extent(data, (d)=>d.date)).range([
        0,
        width
    ]);
    chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).tickValues(data.map((d)=>d.date)).tickFormat(d3.timeFormat("%b")));
    // Y axis: fixed 0→160 000 domain
    const y = d3.scaleLinear().domain([
        0,
        160000
    ]).range([
        height,
        0
    ]);
    chart.append("g").call(d3.axisLeft(y).tickValues([
        0,
        20000,
        40000,
        60000,
        80000,
        100000,
        120000,
        140000,
        160000
    ]).tickFormat((d)=>d === 0 ? "0" : d3.format(".2s")(d)).tickSizeOuter(0));
    // color + line generator
    const color = d3.scaleOrdinal().domain(methods).range(d3.schemeCategory10);
    const lineGen = d3.line().x((d)=>x(d.date)).y((d)=>y(d.value));
    // draw lines + end labels
    methods.forEach((method)=>{
        const series = data.map((d)=>({
                date: d.date,
                value: d[method] || 0
            }));
        chart.append("path").datum(series).attr("fill", "none").attr("stroke", color(method)).attr("stroke-width", 2).attr("d", lineGen);
        chart.append("text").datum(series[series.length - 1]).attr("x", x(series[series.length - 1].date) + 8).attr("y", y(series[series.length - 1].value)).text(method).style("font-size", "12px").style("fill", color(method)).attr("alignment-baseline", "middle");
    });
    // attach the Power BI–style tooltip from interaction.js
    attachCrosshairTooltip({
        svg,
        chart,
        data,
        methods,
        xScale: x,
        yScale: y,
        margin,
        width,
        height,
        color
    });
}
// expose for loader
window.transformToLineChartData = transformToLineChartData;
window.drawLineChart = drawLineChart;

//# sourceMappingURL=data-visualisation-project-dv08_t03.187e74ba.js.map
