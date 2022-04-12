function final_project(){
    var filePath="data.csv";
    question1(filePath);
    question2(filePath);
    question3(filePath);
    question4(filePath);
    question5(filePath);
}


var question1=function(filePath){
  const s = d3.csv(filePath, function(d){
        return {
            country: d.country
            ,year: d.year
            ,fossil_fuel_consumption: parseFloat(d.fossil_fuel_consumption)
            ,renewables_consumption: parseFloat(d.renewables_consumption)
            ,year: parseFloat(d.year)
        }
    });

    //     var svgwidth = 900;
    // var svgheight = 900;
    // var padding = 150;

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#q1_plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var Tooltip = d3.select("#q1_plot")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    var mouseover = function(d) {
        Tooltip.style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
    var mousemove = function(d,i) {
        Tooltip.html(
            i.country + " (" + String(i.year) + ")" + ": <br>" +
            "Renewables consumption: " +  + i.renewables_consumption +"<br>"
            + "Fossil fuel consumption: " + i.fossil_fuel_consumption)
      }

    var mouseleave = function(d) {
        Tooltip.style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
       }
       svg.select("div").remove()

    function changeCountry() {
        svg.selectAll("*")
            .remove()

        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Fossil Fuel vs Renewable Consumption by Country")
        .attr("class", 'q1_title');

        s.then(function(data) {
          svg.append('text').attr('y', 430).attr('x', 385).text('Renewable Energy Consumption');
          svg.append('text').attr('y', 10).attr('x', 5).text('Fossil Fuel Energy Consumption');
            var l = []
            regions = ["United States", "Japan", "United Kingdom", "China", "Mexico", "South Africa"]
            for (var j=0; j < regions.length; j++) {
                d3.selectAll("input[id='"+ "q1_" + regions[j] +"']").each(function() {
                    if (d3.select(this).property("checked")) {
                        l.push(regions[j])
                    }
                })
            }
            var filt = (data.filter(function(d){ return (l.includes(d.country) & d.year >= 1980 & d.year < 2020)}))

            var max_x = (d3.max(d3.map(data, function(d) { return d.renewables_consumption})))

            var x = d3.scaleLinear()
            .domain([0, max_x])
            .range([ 0, width ]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            var max_y = (d3.max(d3.map(data, function(d) { return d.fossil_fuel_consumption})))

            var y = d3.scaleLinear()
            .domain([0, max_y])
            .range([height, 0]);

            svg.append("g")
            .call(d3.axisLeft(y));

            var color_dict = {"United States": "#AD0000", "Japan": "#1B6700"
            , "United Kingdom": "#065B89", "China": "#6A0689", "Mexico": "#C60090"
            , "South Africa": "#D39C00"}

            svg.append('g')
            .selectAll("dot")
            .data(filt)
            .enter()
            .append("circle")
              .attr("cx", function (d) { return x(d.renewables_consumption); } )
              .attr("cy", function (d) { return y(d.fossil_fuel_consumption); } )
              .attr("r", 2.5)
              .style("fill", function (d) {return color_dict[d.country]})
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)



        })
    }
    svg2 = d3.select("#q1_plot").append("svg")
    .attr("width", 200)
    .attr("height", 200)
    svg2.append('rect').attr('x', 130).attr('y', 4).attr('height', 10).attr('width', 20).attr('class', 'United States').style("fill", '#AD0000');
    svg2.append('text').attr('x', 0).attr('y', 10).text('United States').style('font-size', '15px').attr('class', 'United States').attr('alignment-baseline', 'middle');
    svg2.append('rect').attr('x', 130).attr('y', 24).attr('height', 10).attr('width', 20).attr('class', 'Japan').style("fill", '"#1B6700"');
    svg2.append('text').attr('x', 0).attr('y', 30).text('Japan').style('font-size', '15px').attr('class', 'Japan').attr('alignment-baseline', 'middle');
    svg2.append('rect').attr('x', 130).attr('y', 44).attr('height', 10).attr('width', 20).attr('class', 'United Kingdom').style("fill", '#065B89');
    svg2.append('text').attr('x', 0).attr('y', 50).text('United Kingdom').style('font-size', '15px').attr('class', 'United Kingdom').attr('alignment-baseline', 'middle');
    svg2.append('rect').attr('x', 130).attr('y', 64).attr('height', 10).attr('width', 20).attr('class', 'China').style("fill", '#6A0689');
    svg2.append('text').attr('x', 0).attr('y', 70).text('China').style('font-size', '15px').attr('class', 'China').attr('alignment-baseline', 'middle');
    svg2.append('rect').attr('x', 130).attr('y', 84).attr('height', 10).attr('width', 20).attr('class', 'Mexico').style("fill", '#C60090');
    svg2.append('text').attr('x', 0).attr('y', 90).text('Mexico').style('font-size', '15px').attr('class', 'Mexico').attr('alignment-baseline', 'middle');
    svg2.append('rect').attr('x', 130).attr('y', 104).attr('height', 10).attr('width', 20).attr('class', 'South Africa').style("fill", '#D39C00');
    svg2.append('text').attr('x', 0).attr('y', 110).text('South Africa').style('font-size', '15px').attr('class', 'South Africa').attr('alignment-baseline', 'middle');
    d3.select("#checkbox").on("change", changeCountry)
    changeCountry()
}

var question2=function(filePath){
  var rowConverter = function(d){
            return {
                country                        : d["country"],
                year                           : parseInt(d["year"]),
                renewables_consumption         : parseFloat(d["renewables_consumption"]),
                primary_energy_consumption     : parseFloat(d["primary_energy_consumption"])
            };
        }

    const df = d3.csv(filePath, rowConverter);

    df.then(function(data){
        console.log(data)
        var m = {top: 30, right: 30, bottom: 70, left: 60},
            width = 1000 - m.left - m.right,
            height = 550 - m.top - m.bottom;

        var svg = d3.select("#q2_plot")
            .append("svg")
            .attr("width", width + m.left + m.right)
            .attr("height", height + m.top + m.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + m.left + "," + m.top + ")");
        svg.append('text').attr('y', 450).attr('x', 820).text('Year');
        svg.append('text').attr('y', 5).attr('x', 5).text('Renewable Energy Ratio');

        // x axis
        var x = d3.scaleBand()
            .range([ 0, width-100])
            .domain(data.map(function(d) { return d.year;}))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return (d.renewables_consumption/d.primary_energy_consumption); })])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Adding Title
        var title = "Change in Renewable Energy Percentage From 1980 to 2019";
        svg.append('text').attr('y', 20).attr('x', 225).text(title).attr('class', 'q2_title');

        // Tooltip
        var Tooltip = d3.select("#q2_plot")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")

        var countries = [
            "United States",
            "Japan",
            "United Kingdom",
            "China",
            "Mexico",
            "South Africa"
            ]

        var color = d3.scaleOrdinal()
            .domain(countries)
            .range(["#00bfbf","#1872f4","#582afc","#a703d5","#e70b8d","#ff4040"])

        function make_lines() {

            svg.selectAll("rect").remove()
            svg.selectAll(".legend").remove()
            svg.selectAll(".dataline").remove()

            var l = []
            var y0 = 50
            for (j=0; j < countries.length; j++) {
                d3.selectAll("input[id='"+"q2_" +countries[j] +"']").each(function() {
                    if (d3.select(this).property("checked")) {
                        l.push(countries[j])

                        // Adding Title
                        svg.append('rect')
                            .attr('x', 790)
                            .attr('y', y0)
                            .attr('height', 10)
                            .attr('width', 20)
                            .attr('class', countries[j])
                            .attr("fill", color(countries[j]));
                        y0 += 5
                        svg.append('text')
                            .attr('x', 820)
                            .attr('y', y0)
                            .text(countries[j])
                            .style('font-size', '15px')
                            .attr('class', "legend")
                            .attr('alignment-baseline', 'middle');
                        y0 += 10

                        var temp_data = data.filter(
                            function (a) { return (a.country == countries[j]) & (a.year < 2020); }
                        );
                        console.log(temp_data)
                        console.log(color("United States"))
                        svg.append("path")
                            .datum(temp_data)
                            .attr("fill", "none")
                            .attr("stroke", function(d) { return color(countries[j]) })
                            .attr("stroke-width", 2)
                            .attr("d", d3.line()
                                .x(function(d) { return x(d.year) })
                                .y(function(d) {  return y(d.renewables_consumption/d.primary_energy_consumption) })
                            )
                            .attr("class", "dataline")
                    }
                })
            }

        }

        make_lines()
        d3.select("#q2_checkbox").on("change", function(d) {
            make_lines()
        })

    });
}

var question3=function(filePath){
  dataset = d3.csv(filePath);
  dataset.then(function(data){
    // Handle Data
    var us_data = data.filter(d => d.country == "United States");

    var years = us_data.map(d => d.year);
    var energy_types = ['coal_consumption', 'hydro_consumption', 'gas_consumption',
                'oil_consumption', 'renewables_consumption', 'nuclear_consumption'];
    var stack = d3.stack().keys(energy_types);
    var series = stack(us_data);

    // Setup SVG, Axis, and Scales
    var svgwidth = 900;
    var svgheight = 900;
    var padding = 150;

    var svg_q3 = d3.select("#q3_plot").append("svg").attr('id', 'svg_q3')
                   .attr("width", svgwidth).attr("height", svgheight);

    var xScale = d3.scaleLinear().domain([d3.min(years), d3.max(years)]).range([padding, svgwidth-padding]);
    var max_con = d3.max(series, d=> d3.max(d, x=>x[1]));
    var yScale = d3.scaleLinear().domain([0, max_con])
                      .range([svgheight - padding, padding]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    svg_q3.append('g').attr("transform", "translate(0," + (svgheight-padding) + ")").call(xAxis).attr('class', 'xAxis')
    svg_q3.append('g').attr("transform", "translate(" + padding + ", 0)").call(yAxis).attr('class', 'q3_yAxis')
    var color = d3.scaleOrdinal().domain(energy_types).range(['darkslategrey', 'aqua', 'blue',
                                                              'yellow','lightgreen','red']);
    // Adding Legends & Title & Axis Label
    svg_q3.append('rect').attr('x', 730).attr('y', 50).attr('height', 10).attr('width', 20).attr('class', 'coal');
    svg_q3.append('text').attr('x', 760).attr('y', 55).text('Coal').style('font-size', '15px').attr('class', 'coal').attr('alignment-baseline', 'middle');
    svg_q3.append('rect').attr('x', 730).attr('y', 65).attr('height', 10).attr('width', 20).attr('class', 'hydro');
    svg_q3.append('text').attr('x', 760).attr('y', 70).text('Hydro').style('font-size', '15px').attr('class', 'hydro').attr('alignment-baseline', 'middle');
    svg_q3.append('rect').attr('x', 730).attr('y', 80).attr('height', 10).attr('width', 20).attr('class', 'gas');
    svg_q3.append('text').attr('x', 760).attr('y', 85).text('Gas').style('font-size', '15px').attr('class', 'gas').attr('alignment-baseline', 'middle');
    svg_q3.append('rect').attr('x', 730).attr('y', 95).attr('height', 10).attr('width', 20).attr('class', 'oil');
    svg_q3.append('text').attr('x', 760).attr('y', 100).text('Oil').style('font-size', '15px').attr('class', 'oil').attr('alignment-baseline', 'middle');
    svg_q3.append('rect').attr('x', 730).attr('y', 110).attr('height', 10).attr('width', 20).attr('class', 'renewable');
    svg_q3.append('text').attr('x', 760).attr('y', 115).text('Renewable').style('font-size', '15px').attr('class', 'renewable').attr('alignment-baseline', 'middle');
    svg_q3.append('rect').attr('x', 730).attr('y', 125).attr('height', 10).attr('width', 20).attr('class', 'nuclear');
    svg_q3.append('text').attr('x', 760).attr('y', 130).text('Nuclear').style('font-size', '15px').attr('class', 'nuclear').attr('alignment-baseline', 'middle');
    var title = "Energy Consumption of the United States From 1980 to 2019";
    svg_q3.append('text').attr('y', 100).attr('x', 250).text(title).attr('class', 'q3_title');
    svg_q3.append('text').attr('y', 750).attr('x', 775).text('Year')
    svg_q3.append('text').attr('y', 125).attr('x', 100).text('Energy')
    // Adding elements
    var tooltip = d3.select('#q3_plot').append('div').style('opacity', 0).attr('class', 'tooltip');
    var groups = svg_q3.selectAll(".gbars")
										.data(series).enter().append("g")
										.attr("class", (d,i)=>energy_types[i])
                    .attr('fill', function(d,i){
                      return color(d.key);
                    });

    var rects = groups.selectAll('rect')
                      .data(function(d){
												return d;
											})
                      .enter().append('rect')
                      .attr('x', d=>xScale(d.data.year))
                      .attr('y', d=>yScale(d[1]))
                      .attr('height', d=>svgheight-padding-yScale(d[1]-d[0]))
                      .attr('width', 15)
                      .on('mouseover', function(event, d){
                        tooltip.style('opacity', 1);
                        var display = 'year: ' + d.data.year.toString() + ', consumption: ' + (d[1]-d[0]).toString();
                        tooltip.html(display).style("left", event.pageX+"px").style("top", event.pageY+"px");
                      })
                      .on('mousemove', function(event, d){
                        tooltip.transition().duration(100).style('opacity', 1);
                        var display = 'year: ' + d.data.year.toString() + ', consumption: ' + (d[1]-d[0]).toString();
                        tooltip.html(display).style("left", event.pageX+"px").style("top", event.pageY+"px");
                      })
                      .on('mouseout', function(event, d){
                        tooltip.transition().duration(1000).style('opacity', 0);
                        var display = 'year: ' + d.data.year.toString() + ', consumption: ' + (d[1]-d[0]).toString();
                        tooltip.html(display).style("left", event.pageX+"px").style("top", event.pageY+"px");
                      })
    // Radio Interactivity
    d3.select("#radio_q3").on('change', function(d){
      country = d.target.value;
      d3.select('.q3_title').remove();
      var title = "Energy Consumption of " + country + " From 1980 to 2019";
      svg_q3.append('text').attr('y', 100).attr('x', 250).text(title).attr('class', 'q3_title');
      var country_data = data.filter(d => d.country == country);
      var series = stack(country_data);
      var max_con = d3.max(series, d=> d3.max(d, x=>x[1]));
      var yScale = d3.scaleLinear().domain([0, max_con])
                        .range([svgheight - padding, padding]);
      var yAxis = d3.axisLeft().scale(yScale);
      d3.select('.q3_yAxis').remove();
      svg_q3.append('g').attr("transform", "translate(" + padding + ", 0)").call(yAxis).attr('class', 'q3_yAxis')
      groups.data(series).selectAll('rect')
                        .data(function(d){
  												return d;
  											})
                        .transition().duration(1000)
                        .attr('y', d=>yScale(d[1]))
                        .attr('height', d=>svgheight-padding-yScale(d[1]-d[0]))
    })

  })
}

var question4=function(filePath){
  dataset = d3.csv(filePath);
  dataset.then(function(data){
    // Handle Data
    var us_data = data.filter(d => d.country == "United States");

    var years = us_data.map(d => d.year);
    var energy_types = ['coal_cons_per_capita', 'hydro_energy_per_capita',
    'gas_energy_per_capita', 'oil_energy_per_capita',
    'renewables_energy_per_capita', 'nuclear_energy_per_capita'];
    var stack = d3.stack().keys(energy_types);
    var series = stack(us_data);

    // Setup SVG, Axis, and Scales
    var svgwidth = 900;
    var svgheight = 900;
    var padding = 150;

    var svg_q4 = d3.select("#q4_plot").append("svg").attr('id', 'svg_q4')
                   .attr("width", svgwidth).attr("height", svgheight);

    var xScale = d3.scaleLinear().domain([d3.min(years), d3.max(years)]).range([padding, svgwidth-padding]);
    var max_con = d3.max(series, d=> d3.max(d, x=>x[1]));
    var yScale = d3.scaleLinear().domain([0, max_con])
                      .range([svgheight - padding, padding]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    svg_q4.append('g').attr("transform", "translate(0," + (svgheight-padding) + ")").call(xAxis).attr('class', 'xAxis')
    svg_q4.append('g').attr("transform", "translate(" + padding + ", 0)").call(yAxis).attr('class', 'q4_yAxis')
    var color = d3.scaleOrdinal().domain(energy_types).range(['darkslategrey', 'aqua', 'blue',
                                                              'yellow','lightgreen','red']);
    // Adding Legends & Title & Axis Label
    svg_q4.append('rect').attr('x', 730).attr('y', 50).attr('height', 10).attr('width', 20).attr('class', 'coal');
    svg_q4.append('text').attr('x', 760).attr('y', 55).text('Coal').style('font-size', '15px').attr('class', 'coal').attr('alignment-baseline', 'middle');
    svg_q4.append('rect').attr('x', 730).attr('y', 65).attr('height', 10).attr('width', 20).attr('class', 'hydro');
    svg_q4.append('text').attr('x', 760).attr('y', 70).text('Hydro').style('font-size', '15px').attr('class', 'hydro').attr('alignment-baseline', 'middle');
    svg_q4.append('rect').attr('x', 730).attr('y', 80).attr('height', 10).attr('width', 20).attr('class', 'gas');
    svg_q4.append('text').attr('x', 760).attr('y', 85).text('Gas').style('font-size', '15px').attr('class', 'gas').attr('alignment-baseline', 'middle');
    svg_q4.append('rect').attr('x', 730).attr('y', 95).attr('height', 10).attr('width', 20).attr('class', 'oil');
    svg_q4.append('text').attr('x', 760).attr('y', 100).text('Oil').style('font-size', '15px').attr('class', 'oil').attr('alignment-baseline', 'middle');
    svg_q4.append('rect').attr('x', 730).attr('y', 110).attr('height', 10).attr('width', 20).attr('class', 'renewable');
    svg_q4.append('text').attr('x', 760).attr('y', 115).text('Renewable').style('font-size', '15px').attr('class', 'renewable').attr('alignment-baseline', 'middle');
    svg_q4.append('rect').attr('x', 730).attr('y', 125).attr('height', 10).attr('width', 20).attr('class', 'nuclear');
    svg_q4.append('text').attr('x', 760).attr('y', 130).text('Nuclear').style('font-size', '15px').attr('class', 'nuclear').attr('alignment-baseline', 'middle');
    var title = "Energy Per Capita of the United States From 1980 to 2019";
    svg_q4.append('text').attr('y', 100).attr('x', 250).text(title).attr('class', 'q4_title');
    svg_q4.append('text').attr('y', 750).attr('x', 760).text('Year')
    svg_q4.append('text').attr('y', 125).attr('x', 100).text('Energy')
    // Adding elements
    var tooltip = d3.select('#q4_plot').append('div').style('opacity', 0).attr('class', 'tooltip');
    var layers = svg_q4.selectAll("mylayers").data(series).enter().append('path')
          .style('fill', d=>color(d.key))
          .attr("d", d3.area().x(d=>xScale(d.data.year)).y0(d=>yScale(d[0])).y1(d=>yScale(d[1])))
          .on('mouseover', function(e,d){
            tooltip.style('opacity', 1);
            var average = d3.mean(d.map(d=>d[1]-d[0]));
            var display = 'Type: ' + d.key + ', Average: ' + average.toString();
            tooltip.html(display).style("left", event.pageX+"px").style("top", event.pageY+"px");
          })
          .on('mousemove', function(event, d){
            tooltip.transition().duration(100).style('opacity', 1);
            var average = d3.mean(d.map(d=>d[1]-d[0]));
            var display = 'Type: ' + d.key + ', Average: ' + average.toString();
            tooltip.html(display).style("left", event.pageX+"px").style("top", event.pageY+"px");
          })
          .on('mouseout', function(event, d){
            tooltip.transition().duration(1000).style('opacity', 0);
          })

    // Radio Interactivity
    d3.select("#radio_q4").on('change', function(d){
      country = d.target.value;
      d3.select('.q4_title').remove();
      var title = "Energy Consumption of " + country + " From 1980 to 2019";
      svg_q4.append('text').attr('y', 100).attr('x', 250).text(title).attr('class', 'q4_title');
      var country_data = data.filter(d => d.country == country);
      var series = stack(country_data);
      var max_con = d3.max(series, d=> d3.max(d, x=>x[1]));
      var yScale = d3.scaleLinear().domain([0, max_con])
                        .range([svgheight - padding, padding]);
      var yAxis = d3.axisLeft().scale(yScale);
      d3.select('.q4_yAxis').remove();
      svg_q4.append('g').attr("transform", "translate(" + padding + ", 0)").call(yAxis).attr('class', 'q4_yAxis')
      layers.data(series)
        .transition().duration(1000)
        .attr("d", d3.area().x(d=>xScale(d.data.year)).y0(d=>yScale(d[0])).y1(d=>yScale(d[1])));
    })

  })

}

var question5=function(filePath){
  var rowConverter = function(d){
    return {
      year: d.year,
      country: d.country,
      energy_per_capita: d.energy_per_capita
    };
  }
  dataset = d3.csv(filePath, rowConverter);
  dataset.then(function(data){
    console.log(data);
    // Handle data
    var groupData = d3.rollup(data, function(v){
      console.log(v.map(d=>d.energy_per_capita).sort(d3.ascending));
      sorted = v.map(d=>d.energy_per_capita).sort(d3.ascending);
      var q1 = d3.quantile(sorted, 0.25)
      var median = d3.quantile(sorted, 0.5)
      var q3 = d3.quantile(sorted, 0.75)
      var interQuantileRange = q3 - q1;
      var min = q1 - 1.5 * interQuantileRange;
      var max = q3 + 1.5 * interQuantileRange;
      return ({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    }, d=>d.country);
    console.log(groupData);

    // Setup SVG, Axis, and Scales
    var svgwidth = 900;
    var svgheight = 900;
    var padding = 150;

    var svg_q5 = d3.select("#q5_plot").append("svg").attr('id', 'svg_q5')
                   .attr("width", svgwidth).attr("height", svgheight);
    var countries = ['United States', 'Japan', 'United Kingdom', 'China', 'Mexico', 'South Africa'];
    var xScale = d3.scaleBand().domain(countries)
                    .range([padding, svgwidth-padding]);
    var yScale = d3.scaleLinear().domain([0, d3.max(groupData, d=>d[1].max)])
                      .range([svgheight - padding, padding]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    svg_q5.append('g').attr("transform", "translate(0," + (svgheight-padding) + ")").call(xAxis).attr('class', 'xAxis')
    svg_q5.append('g').attr("transform", "translate(" + padding + ", 0)").call(yAxis).attr('class', 'q4_yAxis')

    // Adding Legends & Title & Axis Label
    var title = "Distribution of Energy Per Capita From 1980 to 2019";
    svg_q5.append('text').attr('y', 100).attr('x', 250).text(title).attr('class', 'q5_title');
    svg_q5.append('text').attr('y', 750).attr('x', 760).text('Country')
    svg_q5.append('text').attr('y', 125).attr('x', 100).text('Energy')

    // Show the main vertical line
    svg_q5.selectAll("vertLines").data(groupData).enter()
          .append("line")
          .attr("x1", d=>xScale(d[0])+50)
          .attr("x2", d=>xScale(d[0])+50)
          .attr("y1", d=>d3.min([yScale(0), yScale(d[1].min)]))
          .attr("y2", d=>yScale(d[1].max))
          .attr("stroke", "black")
          .style("width", 40)

    // Rectangle for the main box
    var boxWidth = 50;
    svg_q5.selectAll("boxes")
    .data(groupData)
    .enter()
    .append("rect")
        .attr("x", function(d){return(xScale(d[0])+boxWidth/2)})
        .attr("y", function(d){return(yScale(d[1].q3))})
        .attr("height", function(d){return(yScale(d[1].q1)-yScale(d[1].q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#69b3a2")

    // Median
    svg_q5
    .selectAll("medianLines")
    .data(groupData)
    .enter()
    .append("line")
      .attr("x1", function(d){return(xScale(d[0])-boxWidth/2+50) })
      .attr("x2", function(d){return(xScale(d[0])+boxWidth/2+50) })
      .attr("y1", function(d){return(yScale(d[1].median))})
      .attr("y2", function(d){return(yScale(d[1].median))})
      .attr("stroke", "black")
      .attr("class",'m')
      .style("width", 80)
  })

}
