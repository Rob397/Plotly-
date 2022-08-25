
// Use otu_labels as the hovertext for the chart.

// so your next steps would be creating the init function. then read the samples.json in that 
// function and then get the first sample name and then pass it into your buildData function so the filter in your 
// buildDATA function can use that sample name and put it on the webpage




function init() {
  // Select the dropdown element
  var selector = d3.select("#selDataset");
  
  // Populate the dropdown with subject ID's from the list of sample Names
    d3.json("../samples.json").then((data) => {
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
  d3.json("../samples.json").then((data) => {
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
  });
 }


// function buildCharts() {

//     // `d3.json` to fetch the sample data for the plots
    
//     d3.json("../samples.json").then((data) => {
  
//       // Bar Chart using the sample data
//       var x_values = data.otu_ids;
//       var y_values = data.sample_values;
//       var m_size = data.sample_values;
//       var m_colors = data.otu_ids; 
//       var t_values = data.otu_labels;
      
      
//       // How do I get the  sample_values as the values for the bar chart.????
      
//       // Use otu_ids as the labels for the bar chart.
  
//       // Use otu_labels as the hovertext for the chart.
//       // for (var i=0; i<metadata.length; i++){

//       //   selector.append("option").property("value",metadata[i].id).text(metadata[i].id)
//       // }  


//       var trace1 = {
//         x: x_values,
//         y: y_values,
//         text: t_values,
//         type: 'bar',
//         marker: {
//           color: m_colors,
//           size: m_size
//         }, 
//         orientation:'h',
//       };
      
//       var layout = {
//         title: "top 10 OTUs",
//         barmode: "group"
//       };


//       var traceData = [trace1];
//       Plotly.newPlot('bar', traceData, layout);

    
//     })
  
// };

// buildCharts();
// BuildDATA();



// let samples = data.samples;
// let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
// let result = resultArray[0];



// // 12:23
// let yticks = otu_ids.slice(0, 10).map(otuID => OTU ${otuID}).reverse()









// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.

// Use sample_values for the y values

// Use sample_values for the marker size.

// Use otu_ids for the marker colours.

// Use otu_labels for the text values.



// 4. Display the sample metadata, i.e., an individual's demographic information

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected. -->

