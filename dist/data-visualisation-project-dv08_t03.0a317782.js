const margin = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 70
};
const width = 800; // total width of the chart
const height = 400; // total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let innerChartS;
const tooltipWidth = 65;
const tooltipHeight = 32;
const barColor = "#F5D099";
const bodyBackgroundColor = "#fdf6d9";
// scales
const xScale = d3.scaleBand();
const yScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();
const formatsInfo = [
    {
        id: "age016",
        label: "0-16",
        color: "#dee4e9"
    },
    {
        id: "age1725",
        label: "17-25",
        color: "#bec9d4"
    },
    {
        id: "age2639",
        label: "26-39",
        color: "#9eafbf"
    },
    {
        id: "age4064",
        label: "40-64",
        color: "#7f96aa"
    },
    {
        id: "age65",
        label: "65 and over",
        color: "#607e96"
    },
    {
        id: "unknown",
        label: "Unknown",
        color: "#406682"
    }
];

//# sourceMappingURL=data-visualisation-project-dv08_t03.0a317782.js.map
