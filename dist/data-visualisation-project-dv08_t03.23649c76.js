d3.csv("data/stacked-bar-data.csv",a=>({jurisdiction:a.JURISDICTION,age016:a.AGE016,age1725:a.AGE1725,age2639:a.AGE2639,age4064:a.AGE4064,age65:a.AGE65,unknown:a.Unknown})).then(a=>{console.log(a),drawStackedBars(a)}).catch(a=>{console.error("Error loading the CSV file:",a)});
//# sourceMappingURL=data-visualisation-project-dv08_t03.23649c76.js.map
