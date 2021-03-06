import React, { Component} from 'react'
import './dynamicAnchor.scss'
import jsPlumb from 'jsplumb'
const jsPlumbIn = jsPlumb.jsPlumb
export default class Test extends Component {
  componentDidMount() {
    console.log(jsPlumbIn)
    var sourceAnchors = [
      [0.2, 0, 0, -1, 0, 0, "foo"],
      [1, 0.2, 1, 0, 0, 0, "bar"],
      [0.8, 1, 0, 1, 0, 0, "baz"],
      [0, 0.8, -1, 0, 0, 0, "qux"]
  ],
  targetAnchors = [
      [0.6, 0, 0, -1],
      [1, 0.6, 1, 0],
      [0.4, 1, 0, 1],
      [0, 0.4, -1, 0]
  ],

  exampleColor = '#00f',
  exampleDropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive'
  },
  connector = [ "Bezier", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ], //链接线的形状
  connectorStyle = {
      gradient: {stops: [
          [0, exampleColor],
          [0.5, '#09098e'],
          [1, exampleColor]
      ]},
      strokeWidth: 5,
      stroke: exampleColor
  },
  hoverStyle = {
      stroke: "#449999"
  },
  overlays = [
      ["Diamond", { fill: "#09098e", width: 15, length: 15 } ]
  ],
  endpoint = ["Dot", { cssClass: "endpointClass", radius: 10, hoverClass: "endpointHoverClass" } ],
  endpointStyle = { fill: exampleColor },
  anEndpoint = {
      endpoint: endpoint,  //端点
      paintStyle: endpointStyle,  //连线样式
      hoverPaintStyle: { fill: "#449999" }, //鼠标经过连线时的样式
      isSource: true,
      isTarget: true,
      maxConnections: -1,
      connector: connector, //链接线
      connectorStyle: connectorStyle, //链接线样式
      connectorHoverStyle: hoverStyle, //鼠标在链接线上样式
      connectorOverlays: overlays
  };

var instance = jsPlumbIn.getInstance({
  DragOptions: { cursor: 'pointer', zIndex: 2000 },
  Container: "canvas"
});

// suspend drawing and initialise.
instance.batch(function () {

  var connections = {
          "dynamicWindow1": ["dynamicWindow4"],
          "dynamicWindow3": ["dynamicWindow1"],
          "dynamicWindow5": ["dynamicWindow3"],
          "dynamicWindow6": ["dynamicWindow5"],
          "dynamicWindow2": ["dynamicWindow6"],
          "dynamicWindow4": ["dynamicWindow2"]

      },
      endpoints = {},
  // ask jsPlumb for a selector for the window class
      divsWithWindowClass = jsPlumbIn.getSelector(".dynamic-demo .window");

  // add endpoints to all of these - one for source, and one for target, configured so they don't sit
  // on top of each other.
  for (var i = 0; i < divsWithWindowClass.length; i++) {
      var id = instance.getId(divsWithWindowClass[i]);
      endpoints[id] = [
          // note the three-arg version of addEndpoint; lets you re-use some common settings easily.
          instance.addEndpoint(id, anEndpoint, {anchor: sourceAnchors}),
          instance.addEndpoint(id, anEndpoint, {anchor: targetAnchors})
      ];
  }
  console.log('endpoints', endpoints)
  // then connect everything using the connections map declared above.
  for (var e in endpoints) {
      if (connections[e]) {
          for (var j = 0; j < connections[e].length; j++) {
              instance.connect({
                  source: endpoints[e][0],
                  target: endpoints[connections[e][j]][1]
              });
          }
      }
  }

  // bind click listener; delete connections on click
  instance.bind("click", function (conn) {
      console.log(endpoints, jsPlumbIn.getAllConnections())
      console.log(jsPlumbIn.getManagedElements())
    //   instance.deleteConnection(conn);
  });

  // bind beforeDetach interceptor: will be fired when the click handler above calls detach, and the user
  // will be prompted to confirm deletion.
  instance.bind("beforeDetach", function (conn) {
      return window.confirm("Delete connection?");
  });

  //
  // configure ".window" to be draggable. 'getSelector' is a jsPlumb convenience method that allows you to
  // write library-agnostic selectors; you could use your library's selector instead, eg.
  //
  // $(".window")  		jquery
  // $$(".window") 		mootools
  // Y.all(".window")		yui3
  //
  instance.draggable(divsWithWindowClass);

  jsPlumbIn.fire("jsPlumbDemoLoaded", instance);
  });

  }
  render() {
    return (
      <div class="jtk-demo-main">
            <div class="jtk-demo-canvas canvas-wide dynamic-demo jtk-surface jtk-surface-nopan" id="canvas">
                <div class="window" id="dynamicWindow1"><strong>1</strong><br/><br/></div>
                <div class="window" id="dynamicWindow2"><strong>2</strong><br/><br/></div>
                <div class="window" id="dynamicWindow3"><strong>3</strong><br/><br/></div>
                <div class="window" id="dynamicWindow4"><strong>4</strong><br/><br/></div>
                <div class="window" id="dynamicWindow5"><strong>5</strong><br/><br/></div>
                <div class="window" id="dynamicWindow6"><strong>6</strong><br/><br/></div>
            </div>
            <div class="description">
                <h4>DYNAMIC ANCHORS</h4>
                <p>This is a demonstration of anchors that change position dependent on the location of the other element in a connection. Each Connection is decorated with a Diamond overlay, located halfway along the connector.</p>
                <p>You can drag new connections between Endpoints.</p>
                <p>Endpoints support an unlimited number of Connections.</p>
            </div>
        </div>
    )
  }
}