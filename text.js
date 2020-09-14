function addText(text) {
    var text = new Konva.Text({
        name: 'object',
        text: text,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
        draggable: true,
        id: 'object'+nextId
    });

    // add cursor styling
    text.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });

    text.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    layer.add(text);

    text.x(stage.width() / 2 - text.width() / 2);
    text.y(stage.height() / 2 - text.height() / 2);

    layer.draw();

    var item = document.createElement('li');
    item.textContent = 'Text ' + nextId;
    item.id = 'element' + nextId;
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.addEventListener('click', function() { itemSelected(text.id()); } );

    var b = document.createElement('button');
    b.className = 'btn btn-danger item-delete';
    b.addEventListener('click', function() { itemDelete(text.id()); } );

    var ic = document.createElement('i');
    ic.className = 'fa fa-trash';

    b.appendChild(ic);

    item.appendChild(b);

    var list = document.querySelector('#layers');
    list.appendChild(item);

    tr.nodes([text]);

    nextId++;
}