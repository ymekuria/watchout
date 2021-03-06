 // start slingin' some d3 here.
var width = 800;
var height = 500;
var enemies = 5;
var board = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .classed('board', true);

var background = board.append('image')
  .attr('xlink:href', 'lib/background.jpg')
  .attr('height', height)
  .attr('width', width)

var drag = d3.behavior.drag()  
 .on('drag', function() { player.attr('x', d3.event.x)
                                .attr('y', d3.event.y); })
 
// var player = board.append('circle')
//   .attr('cx', width/2)
//   .attr('cy', height/2)
//   .attr('r', 25)
//   .attr('fill', 'blue')
//   .call(drag)
//   .classed('player', true); 

var player = board.append('image')
  .attr('xlink:href', 'lib/ninja.png')
  .attr('x', width/2)
  .attr('y', height/2)
  .attr('height', '75px')
  .attr('width', '75px')
  .call(drag)
  .classed('player', true)

  
var makeEnemyArray = function(){
  var array = []
  var makeEnemy = function(i, x, y){
    var enemyObj = {}
    enemyObj.id = i;
    enemyObj.x = x;
    enemyObj.y = y;
    return enemyObj;
  }

  for(var i = 0; i < enemies; i++){
    var x = Math.random() * width;
    var y = Math.random() * height;
    array[i] = makeEnemy(i, x, y);
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
    var enemyxaxis = this.getAttribute('x');
    var enemyyaxis = this.getAttribute('y');
    var playerxaxis = player.attr('x');
    var playeryaxis = player.attr('y');
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

    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y})

  selection.enter().append('image')
    .attr('xlink:href', 'lib/shuriken.png')
    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y})
    .attr('width', 40)
    .attr('height', 40)
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


