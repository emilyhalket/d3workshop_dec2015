
var chart_area = d3.select("#chart_area"); 
//have to select the thing that has the chart in our html

var frame = chart_area.append("svg");

var canvas = frame.append("g"); //append group element

var margin = {top:19.5, right:19.5, bottom:19.5, left:39.5};
var frame_width = 960;
var frame_height = 350;
var canvas_width = frame_width - margin.left - margin.right;
var canvas_height = frame_height - margin.top - margin.bottom;

frame.attr("width", frame_width);
frame.attr("height", frame_height);

canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// centers the canvas by translating

 //format X axis
var xScale = d3.scale.log();
xScale.domain([250, 1e5]).range([0, canvas_width]);

var xAxis = d3.svg.axis().orient("bottom").scale(xScale);

canvas.append("g")
	.attr("class", "x_axis")
	.attr("transform", "translate(0," + canvas_height + ")" )
	.call(xAxis);

//format y axis
var yScale = d3.scale.linear();
yScale.domain([10, 85]).range([canvas_height,0]);

var yAxis = d3.svg.axis().orient("left").scale(yScale);

canvas.append("g")
	.attr("class", "y_axis")
	.call(yAxis);

//scale by square root - use for making circle radies scale to population
var rScale = d3.scale.sqrt();
rScale.domain([0,5e8]).range([0,40]);


//format data
var accessor = function(row){
	return {
		country: row.country,
		year: +row.year, /* + turns it into a number */
		pop: +row.pop,
		continent: row.continent,
		lifeExp: +row.lifeExp,
		gdpPercap: +row.gdpPercap

	};
}

d3.csv("http://emilydolson.github.io/D3-visualising-data/resources/nations.csv", 
	accessor,
	function(nations) { 
		console.log(nations);
		var data_canvas = canvas.append("g").attr("class", "data_canvas");

		var year = parseInt(document.getElementById("year_slider").value);
		//takes input from slider, gets value as string then turns it into int
		var filtered_nations = nations.filter(function(d){return d.year ==
			year });
		//& d.continent == "Africa"

		var update = function(){

			var circles = data_canvas.selectAll("circle")
				.data(filtered_nations, function(d){return d.country})
				
			circles.enter()
				.append("circle")

			circles.exit().remove();

			circles.attr("cx", function(d){return xScale(d.gdpPercap)})
				//use xScale function to correctly scale gdp per cap
				.attr("cy", function(d){return yScale(d.lifeExp)})
				.attr("r", function(d){return rScale(d.pop)});
		}
		
		update();

		//make slider!
		d3.select("#year_slider").on("input", function(){
			year = parseInt(this.value);
			filtered_nations = nations.filter(function(d){return 
				d.year == year;
			update();
			})
		})
	}
	);