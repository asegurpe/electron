var background;
function addBackground(radius) {
    background = new Konva.Circle({
        name: 'background',
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: radius,
        fill: '#d2b172',
        draggable: false
    });
    layer.add(background);
    layer.draw();
}