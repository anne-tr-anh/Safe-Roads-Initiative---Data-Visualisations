// interaction.js
// Utility to slugify method names into valid class names
function slugify(str) {
    return str.replace(/\s+/g, "_").replace(/[^\w_]/g, "").toLowerCase();
}
/**
 * Attach a Power BI–style crosshair tooltip to a time‐series chart.
 * @param {Object} config
 *   svg:    D3 selection of the top‐level <svg>
 *   chart:  D3 selection of the <g> containing the chart area
 *   data:   Array of data objects, each with a `date` Date and method keys
 *   methods:Array of method names (legend keys)
 *   xScale: D3 time scale
 *   yScale: D3 linear scale
 *   margin: {top,right,bottom,left}
 *   width:  inner chart width
 *   height: inner chart height
 *   color:  D3 ordinal scale mapping methods → colors
 */ function attachCrosshairTooltip({ svg, chart, data, methods, xScale, yScale, margin, width, height, color }) {
    // remove any prior
    chart.selectAll(".focus").remove();
    svg.selectAll(".tooltip").remove();
    // 1️⃣ Focus group: line + dots
    const focus = chart.append("g").attr("class", "focus").style("display", "none");
    // vertical line
    focus.append("line").attr("class", "hover-line").attr("stroke", "#888").attr("stroke-width", 1).attr("y1", 0).attr("y2", height);
    // one dot per method
    methods.forEach((m)=>{
        focus.append("circle").attr("class", "hover-dot " + slugify(m)).attr("r", 5).style("fill", color(m)).style("stroke", "#fff").style("stroke-width", 1);
    });
    // 2️⃣ Tooltip “box”
    const tooltip = svg.append("g").attr("class", "tooltip").style("display", "none");
    const boxW = 180, lineH = 20, pad = 6;
    // background rect
    tooltip.append("rect").attr("class", "tooltip-bg").attr("width", boxW).attr("height", methods.length * lineH + pad * 2).attr("fill", "white").attr("stroke", "#ccc").attr("rx", 4).attr("ry", 4);
    // month header
    tooltip.append("text").attr("class", "tooltip-month").attr("x", pad).attr("y", pad + 12).style("font-weight", "bold");
    // one dot+label per method
    methods.forEach((m, i)=>{
        tooltip.append("circle").attr("class", "tooltip-circle " + slugify(m)).attr("cx", pad + 5).attr("cy", pad + (i + 1) * lineH + 5).attr("r", 5).style("fill", color(m));
        tooltip.append("text").attr("class", "tooltip-text " + slugify(m)).attr("x", pad + 16).attr("y", pad + (i + 1) * lineH + 10).style("font-size", "12px");
    });
    // 3️⃣ Invisible overlay for mouse events
    chart.append("rect").attr("class", "tooltip-overlay").attr("width", width).attr("height", height).style("fill", "none").style("pointer-events", "all").on("mouseover", ()=>{
        focus.style("display", null);
        tooltip.style("display", null);
    }).on("mouseout", ()=>{
        focus.style("display", "none");
        tooltip.style("display", "none");
    }).on("mousemove", function(event) {
        const [mx] = d3.pointer(event, this);
        const xm = xScale.invert(mx);
        const bisect = d3.bisector((d)=>d.date).left;
        const idx = bisect(data, xm, 1);
        const d0 = data[idx - 1];
        const d1 = data[idx] || d0;
        const d = xm - d0.date > d1.date - xm ? d1 : d0;
        // move crosshair
        focus.select(".hover-line").attr("transform", `translate(${xScale(d.date)},0)`);
        // move each dot
        methods.forEach((m)=>{
            focus.select("circle." + slugify(m)).attr("cx", xScale(d.date)).attr("cy", yScale(d[m] || 0));
        });
        // update tooltip text
        tooltip.select(".tooltip-month").text(d3.timeFormat("%B")(d.date));
        methods.forEach((m, i)=>{
            tooltip.select("text." + slugify(m)).text(`${m}: ${d3.format(",")(d[m] || 0)}`);
        });
        // position tooltip to the right of chart area
        const tx = margin.left + width + 10;
        const ty = margin.top;
        tooltip.attr("transform", `translate(${tx},${ty})`);
    });
}
// expose globally
window.attachCrosshairTooltip = attachCrosshairTooltip;

//# sourceMappingURL=data-visualisation-project-dv08_t03.f7becbee.js.map
