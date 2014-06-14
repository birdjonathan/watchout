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
var rand = function(n){
  return Math.random() * n;
}

// render enemies on gameboard 
var moveEnemies = function (enemies){
  enemies.transition().duration(2000).attr('cx', function(){
        return axes.x(rand(100));
      })
      .attr('cy', function(){
        return axes.y(rand(100));
      })
      .each('end', function(){
        moveEnemies(d3.select(this));
      });
    //.transition().duration(2000).tween('custom', collisionDetection);

}

var checkCollision = function (enemy, collidedCallback) {
  var radius = parseFloat(enemy.attr('r')) + player.r;
  var xDiff = parseFloat(enemy.attr('cx')) - player.x;
  var yDiff = parseFloat(enemy.attr('cy')) - player.y;
  var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (separation < radius) {
    collidedCallback(player, enemy);
  }
}

var onCollision = function () {
  console.log('there was a collision!');
}

var collisionDetection = function (endData) {
  var that = this;
  var enemy = d3.select(that);
  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  }
  var endPos = {
    x: axes.x(endData.x),
    y: axes.y(endData.y)
  }
  return function (t) {
    checkCollision(enemy, onCollision);

    var enemyNextPosition = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    }
    enemy.attr('cx', enemyNextPosition.x)
      .attr('cy', enemyNextPosition.y);

    // console.log('id: ' + enemy.attr('id'));
    // console.log('x: ' + enemy.attr('cx'));
    // console.log('y: ' + enemy.attr('cy'));
    // console.log('***********************');
  }
}

// Establish a shape for a player
// Keep track of the player
var Player = function () {
  // variables of state
  this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this.fill = 'red';
  this.x = 0;
  this.y = 0;
  this.r = 5;
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
  this.setupDragging();
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
Player.prototype.moveRelative = function(dx, dy) {
   this.transform({
    x: this.get('x') + dx, 
    y: this.get('y') + dy,
    angle: 360 * (Math.atan2(dy, dx)/(Math.PI*2))
   });
}
//      translation (x1,y1 to x2,y2)
//      rotate player to face direction of translation
//        make a new player object and render to gameboard
//          Setup dragging
Player.prototype.setupDragging = function(){
  var self = this;
  var dragMove = function(){
    self.moveRelative(d3.event.dx, d3.event.dy);
   };

   var drag = d3.behavior.drag().on('drag', dragMove);
   // drag = function (selection) { dragMove(selction) }
   this.el.call(drag);
}

// Create a turn function, invoke that periodically
var player = new Player();
player.render(board);

// create all enemies
var enemies = board.selectAll('circle.enemy')
      .data(d3.range(config.nEnemies))
      .attr('class', 'update')
      .enter()
      .append('svg:circle')
      .attr('class', 'enemy')
      .attr('r', 10);

moveEnemies(enemies);
