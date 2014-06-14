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

// Establish a shape for a player
// Keep track of the player
var Player = function () {
//    variables of state
  this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this.fill = 'red';
  // this.x = 0;
  // this.y = 0;
  this.x = boardSettings.width * 0.5,
  this.y = boardSettings.height * 0.5
  this.angle = 0;
}

//    render a path in svg
Player.prototype.render = function (to) {
  var el = to.append('svg:path')
             .attr('d', this.path)
             .attr('fill', this.fill);
//    initially render player in middle of board
  var transform = {
    x: boardSettings.width * 0.5,
    y: boardSettings.height * 0.5
  };
//    make draggable by mouse
  //this.setupDragging();
  return this;
};

var player = new Player();
player.render(board);
renderEnemies(createEnemies);
// Player.prototype.get = function(c) {
//   return this[c];
// };

// Player.prototype.setX = function() {
//   var minX = boardSettings.padding;
//   var maxX = boardSettings.width - boardSettings.padding;  
//   if (this.x <= minX) {
//     this.x = minX;
//   }
//   if (this.x >= maxX) {
//     this.x = maxX;
//   }
// };

// Player.prototype.setY = function() {
//   var minY = boardSettings.padding;
//   var maxY = boardSettings.height - boardSettings.padding;  
//   if (this.y <= minY) {
//     this.y = minY;
//   }
//   if (this.y >= maxY) {
//     this. = maxY;
//   }
// }

// Player.prototype.transform = function (options) {
//   this.angle = options.angle || this.angle;
//   this.setX(options.x || this.x);
//   this.setY(options.y || this.y);
// };

//    restrict player's movement to a particular

//    add methods to move the player
//      translation (x1,y1 to x2,y2)
//      rotate player to face direction of translation
//  make a new player object and render to gameboard


// Create a turn function, invoke that periodically
//  Turn function invokes the render 
// var turn = function(){
//   renderEnemies(createEnemies());

// };

// setInterval(function(){
//   turn();
// }, 100);
