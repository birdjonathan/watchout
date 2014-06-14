// start slingin' some d3 here.
var boardSettings = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};
// Create the gameboard
//    Add html element to body for containing gameboard
var board = d3.select('.container').append('svg:svg')
     .attr('width', boardSettings.width)
     .attr('height', boardSettings.height);
//    Add css to position containing element?
//    Settings for the height, width, set number of enemies (random)
//    Establish axis for board (svg element)
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, boardSettings.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, boardSettings.height])
};
//    Select container element and append with svg element
//    Set board height/width attributes on svg element 
//   .attr('style', 'background: red');
// Having board, we can create enemies
//    create random coordinates (x, y) for each enemy
//    connect coordinates to the enemy objects
var createEnemies = function() {
  return _.range(0, boardSettings.nEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};
//    render enemies on gameboard 
var renderEnemies = function (enemy_data){
//      create a construct in memory (enemy data model) for selecting all enemy SVG elements
  var enemies = board.selectAll('circle.enemy')
                      .data(enemy_data, function(d){
                        return d.id;
                      });
//          Update DOM with data from enemy model, Attach data to each of those elements- Data is position in coordinates  
//             Iterate over all the enemy elements set the coordinate attributes with scale coordinate values
  enemies.enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(enemy){
      return axes.x(enemy.x);
  })
  .attr('cy', function(enemy){
      return axes.y(enemy.y);
  })
  .attr('r', 7);

//                Remove enemies that are no longer in list
  enemies.exit()
    .remove();
  
}


// 
renderEnemies(createEnemies());
console.log(createEnemies());
