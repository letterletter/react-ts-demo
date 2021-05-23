import React, { Component} from 'react'
import './style.scss'
import jsPlumb from 'jsplumb'
const jsPlumbIn = jsPlumb.jsPlumb
export default class Test extends Component {
  componentDidMount() {
    console.log(jsPlumbIn)
    var color = "gray";

    var instance = jsPlumbIn.getInstance({
        // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
        // than the curves on the first demo, which use the default curviness value.
        Connector: [ "Bezier", { curviness: 50 } ],
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 2 },
        EndpointStyle: { radius: 9, fill: color },
        HoverPaintStyle: {stroke: "#ec9f2e" },
        EndpointHoverStyle: {fill: "#ec9f2e" },
        Container: "canvas"
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        // declare some common values:
        var arrowCommon = { foldback: 0.7, fill: color, width: 14 },
        // use three-arg spec to create two different arrows with the common values:
            overlays = [
                [ "Arrow", { location: 0.7 }, arrowCommon ],
                [ "Arrow", { location: 0.3, direction: -1 }, arrowCommon ]
            ];

        // add endpoints, giving them a UUID.
        // you DO NOT NEED to use this method. You can use your library's selector method.
        // the jsPlumb demos use it so that the code can be shared between all three libraries.
        var windows = jsPlumbIn.getSelector(".chart-demo .window");
        for (var i = 0; i < windows.length; i++) {
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-bottom",
                anchor: "Bottom",
                maxConnections: 2
            });
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-top",
                anchor: "Top",
                maxConnections: 3
            });
        }

        instance.connect({uuids: ["chartWindow3-bottom", "chartWindow6-top" ], overlays: overlays, detachable: true, reattach: true});
        instance.connect({uuids: ["chartWindow1-bottom", "chartWindow2-top" ], overlays: overlays});
        instance.connect({uuids: ["chartWindow1-bottom", "chartWindow3-top" ], overlays: overlays});
        instance.connect({uuids: ["chartWindow2-bottom", "chartWindow4-top" ], overlays: overlays});
        instance.connect({uuids: ["chartWindow2-bottom", "chartWindow5-top" ], overlays: overlays});

        instance.draggable(windows);

    });

    jsPlumbIn.fire("jsPlumbDemoLoaded", instance);
  }
  render() {
    return (
      <div>
        <div class="jtk-demo-main">
            <div class="jtk-demo-canvas canvas-wide chart-demo jtk-surface jtk-surface-nopan" id="canvas">
                <div class="window" id="chartWindow1">window one</div>
                <div class="window" id="chartWindow2">window two</div>
                <div class="window" id="chartWindow3">window three</div>
                <div class="window" id="chartWindow4">window four</div>
                <div class="window" id="chartWindow5">window five</div>
                <div class="window" id="chartWindow6">window six</div>
            </div>
            <div class="description">
                <h4>CHART</h4>
                <p>This is a simple demonstration of using jsPlumb to display hierarchical information.</p>
                <p>Connectors have a paintStyle of `gray` and specify an endpoint of radius 9.
                    Each connection has an Arrow overlay indicating direction, and paints itself orange on mouse hover.
                </p>
                <p>The Bezier curve used in this demo has a 'curviness' of 50</p>
            </div>
        </div>
      </div>
    )
  }
}