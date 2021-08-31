var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
    model: graph,
    width: 800,
    height: 500,
    gridSize: 1,
    perpendicularLinks: false,
    interactive: function(cellView) {
        if (cellView.model.get('customLinkInteractions')) return { vertexAdd: false };
        return true; // all interactions enabled
    },
    linkView: joint.dia.LinkView.extend({
        // custom interactions:
        pointerdblclick: function(evt, x, y) {
            if (this.model.get('customLinkInteractions')) {
                this.addVertex(x, y);
            }
        },
        contextmenu: function(evt, x, y) {
            if (this.model.get('customLinkInteractions')) {
                this.addLabel(x, y, { absoluteDistance: true, reverseDistance: true });
            }
        },
        // custom options:
        options: joint.util.defaults({
            doubleLinkTools: true,
        }, joint.dia.LinkView.prototype.options)
    })
});

paper.on('link:pointerdown', function(evt, linkView, x, y) {
    console.log('link:pointerdown');
});

paper.on('link:disconnect', function(linkView, evt, disconnectedFromView, magnetElement, type) {
    console.log('link:disconnect', type, disconnectedFromView, magnetElement);
});

paper.on('link:connect', function(linkView, evt, connectedToView, magnetElement, type) {
    console.log('link:connect', type, connectedToView, magnetElement);
});

$('#perpendicularLinks').on('change', function() {
    paper.options.perpendicularLinks = $(this).is(':checked') ? true : false;
});
var CustomLink = joint.dia.Link.define('examples.CustomLink', {
    defaultLabel: {
        markup: [
            {
                tagName: 'circle',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }
        ],
        attrs: {
            label: {
                text: '%', // default label text
                fill: '#ff0000', // default text color
                fontSize: 14,
                textAnchor: 'middle',
                yAlignment: 'middle',
                pointerEvents: 'none'
            },
            body: {
                ref: 'label',
                fill: '#ffffff',
                stroke: '#000000',
                strokeWidth: 1,
                refRCircumscribed: '60%',
                refCx: 0,
                refCy: 0
            }
        },
        position: {
            distance: 0.5, // place label at midpoint by default
            offset: {
                y: -20 // offset label by 20px upwards by default
            },
            args: {
                absoluteOffset: true // keep offset absolute when moving by default
            }
        }
    }
});

function title(x, y, text) {

    var el = new joint.shapes.basic.Text({
        position: { x: x, y: y },
        size: { width: text.length * 4, height: text.split('\n').length * 15 },
        attrs: {
            text: { text: text, 'font-size': 14, 'text-anchor': 'start' }
        }
    });

    graph.addCell(el);
}

var MyElementWithPorts = joint.shapes.basic.Generic.extend({

    defaults: joint.util.defaultsDeep({

        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect/>',
            '</g>',
            '<g class="inPorts">',
            '<g class="port1"><circle/><text/></g>',
            '<g class="port2"><circle/><text/></g>',
            '<g class="port3"><circle/><text/></g>',
            '</g>',
            '<g class="outPorts">',
            '<g class="port4"><circle/><text/></g>',
            '<g class="port5"><circle/><text/></g>',
            '<g class="port6"><circle/><text/></g>',
            '</g>',
            '</g>'
        ].join(''),

        type: 'basic.Generic',
        attrs: {
            '.': { magnet: false },
            rect: {
                width: 150, height: 250,
                stroke: 'black'
            },
            circle: {
                r: 5,
                magnet: true,
                stroke: 'black'
            },
            text: {
                fill: 'black',
                'pointer-events': 'none'
            },
            '.label': { text: 'Model', dx: 5, dy: 5 },
            '.inPorts text': { dx:-15, 'text-anchor': 'end' },
            '.outPorts text':{ dx: 15 },
            '.inPorts circle': { fill: 'PaleGreen' },
            '.outPorts circle': { fill: 'Tomato' }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

var d = new MyElementWithPorts({
    position: { x: 250, y: 150 },
    size: { width: 80, height: 80 },
    attrs: {
        '.port1 text': { text: 'port1' },
        '.port2 text': { text: 'port2' },
        '.port3 text': { text: 'port3' },
        '.port4 text': { text: 'port4' },
        '.port5 text': { text: 'port5' },
        '.port6 text': { text: 'port6' },
        '.port1': { ref: 'rect', 'ref-y': .2 },
        '.port2': { ref: 'rect', 'ref-y': .4 },
        '.port3': { ref: 'rect', 'ref-y': .6 },
        '.port4': { ref: 'rect', 'ref-y': .2, 'ref-dx': 0 },
        '.port5': { ref: 'rect', 'ref-y': .4, 'ref-dx': 0 },
        '.port6': { ref: 'rect', 'ref-y': .6, 'ref-dx': 0 }
    }
});

graph.addCell(d);


var r1 = new joint.shapes.basic.Rect({

    position: { x: 35, y: 50 },
    size: { width: 70, height: 30 },
    attrs: {
        rect: { fill: 'orange' },
        text: { text: 'Box', magnet: true }
    }

});
graph.addCell(r1);

title(0, 0, 'Manhattan and Metro routing');

var r2 = r1.clone();
graph.addCell(r2);
r2.translate(300);
var r3 = r1.clone();
graph.addCell(r3);
r3.translate(10,300);
var link1 = new CustomLink({
    source: { id: r1.id },
    target: { id: r2.id },
    router: { name: 'metro' },
    connector: { name: 'rounded' }
});
graph.addCell(link1);
