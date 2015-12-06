 // start slingin' some d3 here.
var width = 800;
var height = 500;
var enemies = 5;
var board = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .classed('board', true);

var drag = d3.behavior.drag()  
 .on('drag', function() { player.attr('cx', d3.event.x)
                                .attr('cy', d3.event.y); })
 
// var player = board.append('circle')
//   .attr('cx', width/2)
//   .attr('cy', height/2)
//   .attr('r', 25)
//   .attr('fill', 'blue')
//   .call(drag)
//   .classed('player', true); 

var player = board.append('image')
  .attr('xlink:href', 'lib/shuriken.png')
  .attr('x', width/2)
  .attr('y', height/2)
  .attr('height', '75px')
  .attr('width', '75px')
  .call(drag)
  .classed('player', true)

  
var makeEnemyArray = function(){
  var array = []
  var makeEnemy = function(i, cx, cy){
    var enemyObj = {}
    enemyObj.id = i;
    enemyObj.cx = cx;
    enemyObj.cy = cy;
    return enemyObj;
  }

  for(var i = 0; i < enemies; i++){
    var cx = Math.random() * width;
    var cy = Math.random() * height;
    array[i] = makeEnemy(i, cx, cy);
  }
  return array
}
var scoreReset = function(){
  var score = parseInt(d3.select('.current').selectAll('span').text())
  var highScore = parseInt(d3.select('.highscore').selectAll('span').text())
  if(score > highScore){
    d3.select('.highscore').selectAll('span').text(score)
  } 
  d3.select('.current').selectAll('span').text('0')
}


var collisionCheck = function(){
  return function(){    
    var enemyxaxis = this.getAttribute('cx');
    var enemyyaxis = this.getAttribute('cy');
    var playerxaxis = player.attr('cx');
    var playeryaxis = player.attr('cy');
    var sumRadii = 35;
    if(Math.abs(enemyxaxis - playerxaxis) < sumRadii &&
       Math.abs(enemyyaxis - playeryaxis) < sumRadii){
      scoreReset();
    }
  }
};

var enemyMove = function(array){
  var selection = d3.select('svg').selectAll('.enemy')
    .data(array, function(d) {return d.id})
      
  selection.transition().duration(1000)
    .tween('custom', collisionCheck)

    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})

  selection.enter().append('circle')
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r', 10)
    .attr('fill', 'red')
    .classed('enemy', true)
}

var incrementScore = function(){
  var oldScore = parseInt(d3.select('.current').selectAll('span').text())
  var newScore = oldScore + 1;
  d3.select('.current').selectAll('span').text(newScore)
}

var incrementCollisions = function(){
  if(parseInt(d3.select('.current').selectAll('span').text()) === 0){
    var oldCollisions = parseInt(d3.select('.collisions').selectAll('span').text())
    var newCollisions = oldCollisions + 1
    d3.select('.collisions').selectAll('span').text(newCollisions)
  }
}
enemyMove(makeEnemyArray());
setInterval(function(){enemyMove(makeEnemyArray())}, 1000);
setInterval(incrementScore, 50);
setInterval(incrementCollisions, 100);

