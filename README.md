## Setup

A small example exists under `examples/test.html`

We've been running a simple http server with python and loading this file directly. A simple node server Pull Request would be greatly appreciated :)

Anyways, to use our approach, follow these steps:

1. cd into the directory where this repo is saved
2. run `python -m SimpleHTTPServer`
3. in a browser, hit `localhost:8000/examples/test.html`


#Overview
#####What This Is
This library exposes an API allowing purely functional WebGL rendering. It allows the creation of reusable components and provides a collection of ‘building blocks’ for representing WebGL primitives as stateless functions.

#####What This Isn't
This library does not provide an animation loop. This library does not provide touch, mouse, or keyboard events. This library is not a state machine.

#Top-Level API
* `DRLClass DRL.createClass(object spec)`
* `DRLComponent DRL.render(DRLElement, DOMElement canvas)`
* `DRLElement DRLClass(object newState, array children)`

#Component API
* `update(object newState)`

#Component Specs and Lifecycle
* `DRLElement render()`

#Supported Tags and Attributes

The core rendering elements provided by DRL. These are analogous to the `React.DOM` elements. They are the building blocks for all other elements.

#####Image
* A texture or subsection of a texture.
 
#####Shape
* The most basic graphics drawing primitive.
 
#####Scissor
* A quad that culls all of its child render calls to its bounds.
 
#####Group
* A way or grouping and manipulating the graphics context without visibly rendering anything.
 
#Requirements
The core rendering components need access to the graphics context.
A texture cache that can be preloaded.
An element model that doesn't require the creation of new objects each frame.

Examples
```
var ExampleDRLClass = DRL.createClass({
  render: function() {
    return Image({x: this.props.x, y: this.props.y, path: 'test.png'});
  }
});

var canvas = document.getElementByID('canvas');
var exampleDRL = DRL.render(ExampleDRLClass({x: 10, y: 30}), canvas);

var gameLoop = function(time) {
  exampleDRL.update({x: time, y: 30});
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
```
