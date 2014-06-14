// start slingin' some d3 here.
var config = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};
// Create the gameboard
//    Add html element to body for containing gameboard
var board = d3.select('.container').append('svg:svg')
     .attr('width', config.width)
     .attr('height', config.height);
//    Add css to position containing element?
//    Settings for the height, width, set number of enemies (random)
//    Establish axis for board (svg element)
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, config.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, config.height])
};
//    Select container element and append with svg element
//    Set board height/width attributes on svg element 
//   .attr('style', 'background: red');
// Having board, we can create enemies
//    create random coordinates (x, y) for each enemy
//    connect coordinates to the enemy objects
var createEnemies = function() {
  return _.range(0, config.nEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};
// render enemies on gameboard 
var renderEnemies = function (enemy_data){
  // create a construct in memory (enemy data model) for selecting all enemy SVG elements
  var enemies = board.selectAll('circle.enemy')
                      .data(enemy_data, function(d){
                        return d.id;
                      });
  // Update DOM with data from enemy model, Attach data to each of those elements- Data is position in coordinates  
  // Iterate over all the enemy elements set the coordinate attributes with scale coordinate values
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

  // Remove enemies that are no longer in list
  enemies.exit()
    .remove();

}

// Establish a shape for a player
// Keep track of the player
var Player = function () {
  // variables of state
  this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this.fill = 'red';
  this.x = 0;
  this.y = 0;
  this.angle = 0;
}

// render a path in svg
Player.prototype.render = function (to) {
  this.el = to.append('svg:path')
             .attr('d', this.path)
             .attr('fill', this.fill);
// initially render player in middle of board
  this.transform ({
    x: config.width * 0.5,
    y: config.height * 0.5
  });
  // make draggable by mouse
  //this.setupDragging();
  return this;
};

Player.prototype.get = function(coordinate) {
  return this[coordinate];
};

Player.prototype.set = function(coordinate, value) {
  var length = (coordinate === 'x' ? config.width : config.height);
  var min = config.padding;
  var max = length - config.padding;  
  if (value <= min) {
    value = min;
  }
  if (value >= max) {
    value = max;
  }
  this[coordinate] = value;
}

Player.prototype.transform = function (options) {
  this.angle = options.angle || this.angle;
  this.set('x', options.x || this.x);
  this.set('y', options.y || this.y);
  this.el.attr('transform', 
    'rotate(' + this.angle + ',' + this.get('x') + ',' + this.get('y') + ') '
    + 'translate(' + this.get('x') + ',' + this.get('y') + ')');
};

//    restrict player's movement to a particular

//    add methods to move the player
//      translation (x1,y1 to x2,y2)
//      rotate player to face direction of translation
//  make a new player object and render to gameboard


// Create a turn function, invoke that periodically
//  Turn function invokes the render 
var turn = function(){
  // console.log('xs:');
  // console.log(_.map(createEnemies(), function(enemy){
  //   return enemy.x;
  // }));
  // console.log('ys:');
  // console.log(_.map(createEnemies(), function(enemy){
  //   return enemy.y;
  // }));
  renderEnemies(createEnemies());
};

var player = new Player();
player.render(board);

turn();
setInterval(turn, 1000);
