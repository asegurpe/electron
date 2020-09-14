var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: stageWidth,
    height: stageHeight,
});

var layer = new Konva.Layer();
stage.add(layer);

var x1, y1, x2, y2;
stage.on('mousedown touchstart', (e) => {

    selectObject(e);

    // do nothing if we mousedown on eny shape
    if (e.target !== stage) {
        return;
    }
    x1 = stage.getPointerPosition().x;
    y1 = stage.getPointerPosition().y;
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
    layer.draw();
});

stage.on('mousemove touchmove', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    });
    layer.batchDraw();
});

stage.on('mouseup touchend', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
        selectionRectangle.visible(false);
        layer.batchDraw();
    });

    var shapes = stage.find('.object').toArray();
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
    layer.batchDraw();
});

// clicks should select/deselect shapes
stage.on('click tap', selectObject);

function selectObject(e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
        tr.nodes([]);
        layer.draw();
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage || e.target.hasName('background')) {
        tr.nodes([]);
        layer.draw();
        return;
    }

    // do nothing if clicked NOT on our objects
    if (!e.target.hasName('object')) {
        return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
    }
    layer.draw();
}

addBackground(200);

var tr = new Konva.Transformer({
    keepRatio: true,
    zIndex: -100
});
tr.nodes([]);
layer.add(tr);

// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
});
layer.add(selectionRectangle);

layer.draw();

function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent
    var containerWidth = container.offsetWidth;
    // to do this we need to scale the stage
    var scale = containerWidth / stageWidth;

    stage.width(stageWidth * scale);
    stage.height(stageHeight * scale);
    stage.scale({ x: scale, y: scale });
    stage.draw();
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);

var nextId = 0;

function itemSelected(id) {
    var shape = stage.find('#' + id)[0];
    if (shape != undefined) {
        var shape = stage.find('#' + id)[0];
        tr.attachTo(shape);
        layer.draw();
    }
}
function itemDelete(id) {
    tr.nodes([]);
    var shape = stage.find('#' + id)[0];
    shape.destroy();

    var ide = id.replace("object", "");
    var li = document.querySelector('#element' + ide);
    li.parentNode.removeChild(li);
    layer.draw();
}