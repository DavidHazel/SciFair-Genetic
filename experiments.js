/**
 JS file to calculate the experiments results.
*/

var count_x_blue_x_green = 0;
var count_x_green_x_green = 0;
var count_x_blue_y_naked = 0;
var count_x_green_y_naked = 0;

var ovaries_bucket = [  "x_green", 
						"x_green",
						"x_green",
						"x_green",
						"x_green",
						"x_blue",
						"x_blue",
						"x_blue",
						"x_blue",
						"x_blue"
					];

var testes_bucket = [	"x_green", 
						"x_green",
						"x_green",
						"x_green",
						"x_green",
						"y_naked",
						"y_naked",
						"y_naked",
						"y_naked",
						"y_naked"
					]

function getRandom(a){
	return a[Math.round(Math.random()*(a.length-1))];

}

/*
Rerun all calculations, we do this becasue we have limited inputs and its easier just to recalc the page
*/
function runExperiments(){

	//clear results
	count_x_blue_x_green = 0;
	count_x_green_x_green = 0;
	count_x_blue_y_naked = 0;
	count_x_green_y_naked = 0;
	var experimentLog = document.getElementById('ExperimentLog');
	experimentLog.innerHTML = "";

	console.log("running experiments");


	var samplesize = document.getElementById('SampleSize').value;
	
	console.log("Sample Size" . samplesize);
	var counter = 0;
	var results= "";
	while (counter < samplesize) {
		results = getRandom(ovaries_bucket) + '_' + getRandom(testes_bucket);
		resultsLog = counter + " = " + results;
		experimentLog.insertAdjacentHTML('beforeend', resultsLog + "</br>");

		updateResults(results);
		counter++;
	}

	//write results to experiments
	var printResults = "<div><strong>Sample Size : " + samplesize + "</strong></div>";
	printResults += "<div>X Blue | X Green = " + count_x_blue_x_green + "</div>";
	printResults += "<div>X Green | X green = " + count_x_green_x_green + "</div>";
	printResults += "<div>X Blue | Y Naked = " + count_x_blue_y_naked + "</div>";
	printResults += "<div>X Green | Y Naked = " + count_x_green_y_naked + "</div>";

	updateResultsValue("Results", printResults);
	
	var results = [];
	results['samplesize'] = samplesize;
	results['count_x_blue_x_green'] = count_x_blue_x_green;
	results['count_x_green_x_green'] = count_x_green_x_green;
	results['count_x_blue_y_naked'] = count_x_blue_y_naked;
	results['count_x_green_y_naked'] = count_x_green_y_naked;

	logResults(results);


}

function logResults(data){
	$.post( "log.php", {
		samplesize: data.samplesize,
		count_x_blue_x_green: data.count_x_blue_x_green,
		count_x_green_x_green: data.count_x_green_x_green,
		count_x_blue_y_naked: data.count_x_blue_y_naked,
		count_x_green_y_naked: data.count_x_green_y_naked
	 } );
}
function updateResults(results){
	//update the count variables

	switch(results){
		case "x_blue_x_green":
			count_x_blue_x_green++;
			break;
		case "x_green_x_green":
			count_x_green_x_green++;
			break;
		case "x_blue_y_naked":
			count_x_blue_y_naked++;
			break;
		case "x_green_y_naked":
			count_x_green_y_naked++;
			break;
	}
	//update the results window pane

}

function onLoad(){
	var resultsButton = document.getElementById('runExperiments');
	resultsButton.onclick = runExperiments;
}

/*
 ResultDivID = the ID of the div you want to place your results value inside of
 val = the value you want to display
*/
function updateResultsValue(ResultDivID, val) {
	var results = document.getElementById(ResultDivID);
	results.innerHTML = val;
}











