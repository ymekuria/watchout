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
 
var player = board.append('circle')
  .attr('cx', width/2)
  .attr('cy', height/2)
  .attr('r', 25)
  .attr('fill', 'blue')
  .call(drag)
  .classed('player', true); 


  
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

var enemyMove = function(array){
  var selection = d3.select('svg').selectAll('.enemy')
    .data(array, function(d) {return d.id})
      
  selection.transition().duration(1000)
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy});   

  selection.enter().append('circle')
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r', 10)
    .attr('fill', 'red')
    .classed('enemy', true)



}
enemyMove(makeEnemyArray());
setInterval(function(){enemyMove(makeEnemyArray())}, 1000);



