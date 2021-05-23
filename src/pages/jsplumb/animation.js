import React, { Component} from 'react'
import './animation.scss'
import jsPlumb from 'jsplumb'
import littledot from './littledot.png'
const jsPlumbIn = jsPlumb.jsPlumb
export default class Test extends Component {
  componentDidMount() {
    console.log(jsPlumbIn)
    var instance,
        discs = [],
    
        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumbIn.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
                var o = instance.getOffset(el, true),
                    o2 = instance.getOffset(el),
                    s = jsPlumbIn.getSize(el),
                    pxy = [e.pageX || e.clientX, e.pageY || e.clientY],
                    c = [pxy[0] - (o.left + (s[0] / 2)), pxy[1] - (o.top + (s[1] / 2))],
                    oo = [c[0] / s[0], c[1] / s[1]],
                    DIST = 350,
                    l = o2.left + (oo[0] * DIST),
                    t = o2.top + (oo[1] * DIST);

                var id = el.getAttribute("id");
                instance.animate(el, {left: l, top: t}, { duration: 350, easing: 'easeOutBack' });
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
        endpoint = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 7, stroke: "rgba(198,89,30,0.7)" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);

            return instance.addEndpoint(elId, endpoint);
        },

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("canvas").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = document.documentElement.clientWidth - 162, h = document.documentElement.clientHeight - 162;
            var x = (0.2 * w) + Math.floor(Math.random() * (0.5 * w));
            var y = (0.2 * h) + Math.floor(Math.random() * (0.6 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumbIn instance, setting some appropriate defaults and a Container.
    instance = jsPlumbIn.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: littledot } ],
        Connector: [ "Bezier", { curviness: 90 } ],
        Container: "canvas"
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("bd1"),
            e2 = prepare("bd2"),
            e3 = prepare("bd3"),
            e4 = prepare("bd4"),
            clearBtn = jsPlumbIn.getSelector("#anim-clear"),
            addBtn = jsPlumbIn.getSelector("#add");

        instance.on(clearBtn, "click", function (e) { //删除连接线
            e.preventDefault();
            e.stopPropagation();
            instance.deleteEveryConnection();
        });

        instance.connect({ source: e1, target: e2 });
        instance.connect({ source: e1, target: e3 });
        instance.connect({ source: e1, target: e4 });

        instance.on(addBtn, 'click', addDisc);
    });

    jsPlumbIn.fire("jsPlumbDemoLoaded", instance);

  }
  render() {
    return (
      <div>
        <div className="jtk-demo-main" id='animation-demo'>
            <div className="jtk-demo-canvas canvas-wide animation-demo jtk-surface jtk-surface-nopan" id="canvas">
                <div className="bigdot" id="bd1"></div>
                <div className="bigdot" id="bd2"></div>
                <div className="bigdot" id="bd3"></div>
                <div className="bigdot" id="bd4"></div>
            </div>
            <div className="description">
                <h4>ANIMATION</h4>
                <p>This is a demonstration of jsPlumb's 'animate' method.</p>
                <p>Drag orange dots to create connections.</p>
                <p>Click on or near blue dots to make them move in that direction.</p>
                <div className="commands">
                    <a id="add" href="#" className="cmd">Add a Disc</a>
                    <a id="anim-clear" href="#" className="cmd">Remove All Connections</a>
                </div>
            </div>
        </div>
      </div>
    )
  }
}