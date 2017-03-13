var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  // your code here
  var numberOfStream=[];
  for(i=0; i<tracks.length; i++){
    numberOfStream.push(tracks[i].popularity);
  }
  return numberOfStream;
}

function extractNames(tracks) {
  // your code here
  var names=[];
  for(i=0; i<tracks.length; i++){
    names.push(tracks[i].name);
  }
  return names;
}

function chartData(labels, inputData) {
  // your code here
  var dataObj = {};
  dataObj.labels = labels;
  dataObj.datasets = [
  {
    fillColor: 'rgba(220,220,220,0.5)', 
      strokeColor: 'rgba(220,220,220,0.8)', 
      highlightFill: 'rgba(220,220,220,0.75)', 
      highlightStroke: 'rgba(220,220,220,1)', 
      data: inputData
  }
  ];
  return dataObj;

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
 $.ajax({
  url: url
  success: function(result){
    callback(result);
  }
 });
}

function success(parsedJSON) {
  
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var streams = extractPopularity(tracks);
  var data = chartData(names, streams);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(ctx).Bar(data);

}
