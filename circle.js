function addCircle(radius) {
    var circle = new Konva.Circle({
        name: 'object',
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: radius,
        stroke: 'black',
        draggable: true,
        dragBoundFunc: function (pos) {
            var x = stage.width() / 2;
            var y = stage.height() / 2;
            var radius = background.radius();
            var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
            if (scale < 1) {
                return {
                    y: Math.round((pos.y - y) * scale + y),
                    x: Math.round((pos.x - x) * scale + x)
                };
            }
            else return pos;
        },
        id: 'object'+nextId
    });

    layer.add(circle);
    layer.draw();

    var item = document.createElement('li');
    item.textContent = 'Circle ' + nextId;
    item.id = 'element' + nextId;
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.addEventListener('click', function() { itemSelected(circle.id()); } );

    var b = document.createElement('button');
    b.className = 'btn btn-danger item-delete';
    b.addEventListener('click', function() { itemDelete(circle.id()); } );

    var ic = document.createElement('i');
    ic.className = 'fa fa-trash';

    b.appendChild(ic);

    item.appendChild(b);

    var list = document.querySelector('#layers');
    list.appendChild(item);

    circle.on('transform', function (e) {
        this.strokeWidth(1);
        layer.draw();
    });

    tr.nodes([circle]);

    nextId++;
}