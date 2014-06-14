// start slingin' some d3 here.
// Create the gameboard
//    Add html element to body for containing gameboard
var board = d3.select('body');
//    Add css to position containing element?
//    Settings for the height, width, set number of enemies (random)
var boardSettings = {
  height: 450,
  width: 700,
  nEnemies: Math.floor(Math.random() * 50)
};
//    Establish axis for board (svg element)
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, boardSettings.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, boardSettings.height])
};
//    Select container element and append with svg element
board.append('svg:svg')
     .attr('width', boardSettings.width)
     .attr('height', boardSettings.height)
     .attr('style', 'background: red');
//    Set board height/width attributes on svg element 
// Having board, we can create enemies
//    create random coordinates (x, y) for each enemy
//    connect coordinates to the enemy objects
//    render enemies on gameboard 
