// start slingin' some d3 here.
var width = 800;
var height = 500;

var board = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .classed('board', true);

var player = board.append('circle')
  .attr('cx', width/2)
  .attr('cy', height/2)
  .attr('r', 50)
  .attr('fill', 'blue')