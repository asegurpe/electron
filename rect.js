function addRect(width, height) {
    var rect = new Konva.Rect({
        name: 'object',
        x: stage.width() / 2 - (width / 2),
        y: stage.height() / 2 - (height / 2),
        width: width,
        height: height,
        stroke: 'black',
        draggable: true,
        id: 'object'+nextId
    });

    // add cursor styling
    rect.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });

    rect.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    rect.on('transform', function (e) {
        this.strokeWidth(1);
        layer.draw();
    });

    layer.add(rect);
    layer.draw();

    var item = document.createElement('li');
    item.textContent = 'Rect ' + nextId;
    item.id = 'element' + nextId;
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.addEventListener('click', function() { itemSelected(rect.id()); } );

    var b = document.createElement('button');
    b.className = 'btn btn-danger item-delete';
    b.addEventListener('click', function() { itemDelete(rect.id()); } );

    var ic = document.createElement('i');
    ic.className = 'fa fa-trash';

    b.appendChild(ic);

    item.appendChild(b);

    var list = document.querySelector('#layers');
    list.appendChild(item);

    tr.nodes([rect]);

    nextId++;
}