var Board = function(el) {
  this.el = el;
  this.postIts = [];
  var self = this;

  this.el.on('click', function(e) {
    self.createPostIt(e.clientX,e.clientY);
  });
};

Board.prototype.createPostIt = function(x,y) {
  this.postIts.push(new PostIt('.post-it'));
  this.appendPostIt(this.postIts.last());
  this.placePostIt(this.postIts.last(),x,y);
};

Board.prototype.appendPostIt = function(postIt) {
  this.el.append(postIt.el);
};

Board.prototype.placePostIt = function(postIt,x,y) {
  this.el.find(postIt.selector + ':last-child').css(
    { left: x, top: y }
  );
};

var PostIt = function(selector) {
  this.el = $('<div class="post-it"><p class="header"><span class="close">x</span></p><div class="content" contenteditable="true"></div></div>');
  this.el.draggable( { handle: '.header' } );
  this.el.resizable();
  this.selector = selector
  this.close = '.close';
  var self = this

  this.el.find(this.close).on('click', function(e) {
    e.stopPropagation();
    self.removePostIt();
  });

  this.el.on('click', function(e) {
    e.stopPropagation();
  });
};

PostIt.prototype.removePostIt = function() {
  this.el.remove();
};

Array.prototype.last = function() {
  return this[this.length-1];
};

$(function() {
  board = new Board($('#board'));

});
