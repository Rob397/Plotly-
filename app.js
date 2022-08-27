
//  function and then get the first sample name and then pass it into your buildData function so the filter in your 
// buildDATA function can use that sample name and put it on the webpage




function init() {
  // Select the dropdown element
  var selector = d3.select("#selDataset");
  
  // Populate the dropdown with subject ID's from the list of sample Names
    d3.json("samples.json").then((data) => {
      // let metadata = data.metadata; 
      // for (var i=0; i<metadata.length; i++){

      //   selector.append("option").property("value",metadata[i].id).text(metadata[i].id)
      // }  
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
     selector
       .append("option")
       .text(sample)
       .property("value", sample);
   });
   // Use the first sample from the list to build the initial plots
   var firstSample = sampleNames[0];
   buildCharts(firstSample);
   buildMetadata(firstSample);
 });
}
init();
function optionChanged(newsample){
// console.log(a)
    buildMetadata(newsample);
    buildCharts(newsample);
}


function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of #sample-metadata
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use Object.entries to add each key and value pair to the panel
    // Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
 }



function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //   Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var wfreq = result.wfreq;
    // Create the yticks for the bar chart.
    //  so the otu_ids with the most bacteria are last.
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // Create the trace for the bar chart.
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", barData, barLayout);



// otu_ids for the x values.
// sample_values for the y values.
// sample_values for the marker size.
// otu_ids for the marker colours.
// otu_labels for the text values
    var BubbleData = [
      {
        y: sample_values,
        x: otu_ids,
        text: otu_labels,
        mode: 'markers',
      marker: {
        size: sample_values, color:otu_ids, colorscale: "Earth"
      }
      }];

    var layout = {
      title: 'Bubble Chart',
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot("bubble", BubbleData, layout);

    // Gauge Charts
    //Unable to find the appropriate style

    var wfreq=result.wfreq
        

    var data_gauge = [
      {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: {text: `Belly Button Washing Frequency`},
      type: "indicator",
      
      mode: "gauge+number",
      gauge: { axis: { range: [null, 9] },
               steps: [
                {range: [0, 1], color: "white"},
                {range: [1, 2], color: "white"},
                {range: [2, 3], color: "white"},
                {range: [3, 4], color: "white"},
                {range: [4, 5], color: "white"},
                {range: [5, 6], color: "white"},
                {range: [6, 7], color: "white"},
                {range: [7, 8], color: "white"},
                {range: [8, 9], color: "white"}
              ]}
          
      }
    ];
    var layout2 = { 
        width: 700, 
        height: 600, 
        margin: { t: 20, b: 40, l:100, r:100 } 
      };
    Plotly.newPlot("gauge", data_gauge, layout2);



    });
}
