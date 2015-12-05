// start slingin' some d3 here.
var width = 800;
var height = 500;
var enemies = 10
var board = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .classed('board', true);

// var player = board.append('circle')
//   .attr('cx', width/2)
//   .attr('cy', height/2)
//   .attr('r', 25)
//   .attr('fill', 'blue')
//   .classed('player', true); 
  
var enemyArr = []
for(var i = 0; i < 10; i++){
  // var cx = Math.random() * width;
  // var cy = Math.random() * height;
  enemyArr.push(i);
}

var enemyMove = function(array){
  var selection = d3.select('svg').selectAll('circle')
    .data(array, function(d) {return d})
    .attr('cx', function(){return Math.random() * width})
    .attr('cy', function(){return Math.random() * height})

  selection.enter().append('circle')
    .attr('cx', function(){return Math.random() * width})
    .attr('cy', function(){return Math.random() * height})
    .attr('r', 10)
    .attr('fill', 'red')
    .classed('enemy', true);
}

enemyMove(enemyArr);



