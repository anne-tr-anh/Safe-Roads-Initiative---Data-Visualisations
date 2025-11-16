d3.csv("data/stacked-bar-data.csv", (d)=>({
        jurisdiction: d.JURISDICTION,
        age016: d.AGE016,
        age1725: d.AGE1725,
        age2639: d.AGE2639,
        age4064: d.AGE4064,
        age65: d.AGE65,
        unknown: d.Unknown
    })).then((data)=>{
    console.log(data);
    drawStackedBars(data);
}).catch((error)=>{
    console.error("Error loading the CSV file:", error);
});

//# sourceMappingURL=data-visualisation-project-dv08_t03.7ef71f72.js.map
