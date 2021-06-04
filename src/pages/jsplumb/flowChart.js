import React, { Component} from 'react'
import './flowchart.scss'
import jsPlumb from 'jsplumb'
const jsPlumbIn = jsPlumb.jsPlumb
export default class FLowChart extends Component {

  componentDidMount() {
    var instance = window.jsp = jsPlumbIn.getInstance({
      // default drag options
      DragOptions: { cursor: 'pointer', zIndex: 2000 },
      // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
      // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
      ConnectionOverlays: [
          [ "Arrow", {
              location: 1,
              visible:true,
              width:11,
              length:11,
              id:"ARROW",
              events:{
                  click:function() { alert("you clicked on the arrow overlay")}
              }
          } ],
          [ "Label", {
              location: 0.1,
              id: "label",
              cssClass: "aLabel",
              events:{
                  tap:function() { alert("hey"); }
              }
          }]
      ],
      Container: "canvas"
    });

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
      strokeWidth: 2,
      stroke: "#61B7CF",
      joinstyle: "round",
      outlineStroke: "white",
      outlineWidth: 2
  },
// .. and this is the hover style.
  connectorHoverStyle = {
      strokeWidth: 3,
      stroke: "#216477",
      outlineWidth: 5,
      outlineStroke: "white"
  },
  endpointHoverStyle = {
      fill: "#216477",
      stroke: "#216477"
  },
// the definition of source endpoints (the small blue ones)
  sourceEndpoint = {
      endpoint: "Dot",
      paintStyle: {
          stroke: "#7AB02C",
          fill: "transparent",
          radius: 7,
          strokeWidth: 1
      },
      isSource: true,  //设为true,可以在用户拖动时，自动创建链接
      connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
      connectorStyle: connectorPaintStyle,
      hoverPaintStyle: endpointHoverStyle,
      connectorHoverStyle: connectorHoverStyle,
      dragOptions: {},
      overlays: [  //配置箭头，可理解为遮罩层，
          [ "Label", {
              location: [0.5, 1.5],
              label: "Drag",
              cssClass: "endpointSourceLabel",
              visible:true
          } ]
      ]
    },
    // the definition of target endpoints (will appear when the user drags a connection)
    targetEndpoint = {
        endpoint: "Dot",
        paintStyle: { fill: "#7AB02C", radius: 7 },
        hoverPaintStyle: endpointHoverStyle,
        maxConnections: -1,  //设为-1，即不限制连线数量，不设置时，值是1
        dropOptions: { hoverClass: "hover", activeClass: "active" },
        isTarget: true,
        overlays: [
            [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:true } ]
        ]
    },
    init = function (connection) {
        connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
    };
    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) { //增加端点
      for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i];
          instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
              anchor: sourceAnchors[i], uuid: sourceUUID
          });
      }
      for (var j = 0; j < targetAnchors.length; j++) {
          var targetUUID = toId + targetAnchors[j];
          instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
      }
    };

    // suspend drawing and initialise.
    instance.batch(function () {

      _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
      _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
      _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
      _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);

      // listen for new connections; initialise them the same way we initialise the connections at startup.
      instance.bind("connection", function (connInfo, originalEvent) {
          init(connInfo.connection);
      });

      // make all the window divs draggable
      //使得所有 class是 .flowchart-demo .window 的可拖动
      instance.draggable(jsPlumbIn.getSelector(".flowchart-demo .window"), {containment: 'canvas', grid: [20, 20] });  
      //containment限制只在canvas范围内，grid属性是网格对齐
      // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
      // method, or document.querySelectorAll:
      //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

      // connect a few up
      instance.connect({uuids: ["Window2BottomCenter", "Window3TopCenter"]});
      instance.connect({uuids: ["Window2LeftMiddle", "Window4LeftMiddle"]});
      instance.connect({uuids: ["Window4TopCenter", "Window4RightMiddle"]});
      instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"]});
      instance.connect({uuids: ["Window4BottomCenter", "Window1TopCenter"]});
      instance.connect({uuids: ["Window3BottomCenter", "Window1BottomCenter"] });
      //

      //
      // listen for clicks on connections, and offer to delete connections on click.
      //
      instance.bind("click", function (conn, originalEvent) { //链接点击删除
         if (window.confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {
             instance.deleteConnection(conn);
         }
      });

      instance.bind("connectionDrag", function (connection) {
          console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
      });

      instance.bind("connectionDragStop", function (connection) {
          console.log("connection " + connection.id + " was dragged");
      });

      instance.bind("connectionMoved", function (params) {
          console.log("connection " + params.connection.id + " was moved");
      });
      instance.bind('beforeDrop', function(info) {  //返回false,链接不会建立
        console.log('链接建立前', info)
      })
    });
    jsPlumbIn.fire("jsPlumbDemoLoaded", instance);
    //jsPlumbIn.setContainer('canvas')
  }
  render() {
    return(
      <div class="jtk-demo-main">
            <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
                <div class="window jtk-node" id="flowchartWindow1"><strong>1</strong><br/><br/></div>
                <div class="window jtk-node" id="flowchartWindow2"><strong>2</strong><br/><br/></div>
                <div class="window jtk-node" id="flowchartWindow3"><strong>3</strong><br/><br/></div>
                <div class="window jtk-node" id="flowchartWindow4"><strong>4</strong><br/><br/></div>
            </div>
            <div class="description">
                <h4>FLOWCHART</h4>
                <p>Nodes are connected with the Flowchart connector.</p>
                <p>Hover over connections to highlight them, click to delete. </p>
                <p>Drag new connections from hollow dots to solid dots. You can also drag connections from their source/target to other sources/targets, or back onto themselves.</p>
                <p>By default, Flowchart connectors have square corners, but by setting the 'cornerRadius' parameter, as we have here, you can get rounded corners.</p>
            </div>
        </div>
    )
  }
}