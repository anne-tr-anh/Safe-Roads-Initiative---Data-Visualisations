// load-linechart-data.js
d3.csv("data/finaldata.csv", (d)=>({
        START_DATE: d.START_DATE.trim(),
        DETECTION_METHOD: d.DETECTION_METHOD.trim(),
        JURISDICTION: d.JURISDICTION.trim(),
        FINES: +d.FINES,
        METRIC: d.METRIC.trim()
    })).then((raw)=>{
    // 1️⃣ Keep only the speed_fines metric
    const filtered = raw.filter((d)=>d.METRIC === "speed_fines");
    // 2️⃣ Transform (this applies QLD/12 and builds per-month rows)
    const series = transformToLineChartData(filtered);
    // 3️⃣ Draw
    drawLineChart(series);
}).catch((err)=>console.error("\u274C loading line-chart data failed:", err));

//# sourceMappingURL=data-visualisation-project-dv08_t03.fa32c509.js.map
