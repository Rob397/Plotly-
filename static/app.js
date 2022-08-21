// Use the D3 library to read in samples.json.

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.


function BuildDATA(sample) {
    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url = "../samples.json";

    // C:\Users\mr-ma\Documents\GitHub\Plotly-\samples.json
    
    d3.json(url).then((sample) => {
  
      // Use d3 to select the panel 
      var sample_metadata = d3.select("#sample-metadata");
  
      // clear any existing metadata
      sample_metadata.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
      Object.entries(sample).forEach(function ([key, value]) {
        var row = sample_metadata.append("panel-body");
        row.text(`${key}: ${value} \n`);
      });
    });
  }

  



  function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = "../samples.json";
    d3.json(url).then(function(data) {
  
      // @TODO: Bar Chart using the sample data
      var x_values = data.otu_ids;
      var y_values = data.sample_values;
      var m_size = data.sample_values;
      var m_colors = data.otu_ids; 
      var t_values = data.otu_labels;
  
      var trace1 = {
        x: x_values,
        y: y_values,
        text: t_values,
        type: 'bar',
        marker: {
          color: m_colors,
          size: m_size
        }, 
        orientation:'h',
      };
      
      var layout = {
        title: "top 10 OTUs",
        barmode: "group"
      };


      var traceData = [trace1];
      Plotly.newPlot('bar', traceData, layout);

    
  })
}

buildCharts();


























// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.

// Use sample_values for the y values

// Use sample_values for the marker size.

// Use otu_ids for the marker colours.

// Use otu_labels for the text values.



// 4. Display the sample metadata, i.e., an individual's demographic information

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected. -->

