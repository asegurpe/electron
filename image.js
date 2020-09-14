function addImage(path) {
    var imageObj = new Image();
    imageObj.onload = function () {

        var OpacityFilter = function (imageData) {
            // make all pixels opaque 100%
            var nPixels = imageData.data.length;
            for (var i = 3; i < nPixels; i += 4) {
                var r = imageData.data[i-3];
                var g = imageData.data[i-2];
                var b = imageData.data[i-1];
                if (r >= 230 && g >= 230 || b >= 230) {
                    imageData.data[i] = 0;
                }
            }
        };

        var image = new Konva.Image({
            name: 'object',
            image: imageObj,
            draggable: true,
            filters: [OpacityFilter],
            id: 'object'+nextId
        });

        image.cache();

        // add the shape to the layer
        layer.add(image);

        image.x(stage.width() / 2 - image.width() / 2);
        image.y(stage.height() / 2 - image.height() / 2);

        layer.batchDraw();

        var item = document.createElement('li');
        item.textContent = 'Image ' + nextId;
        item.id = 'element' + nextId;
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.addEventListener('click', function() { itemSelected(image.id()); } );

        var b = document.createElement('button');
        b.className = 'btn btn-danger item-delete';
        b.addEventListener('click', function() { itemDelete(image.id()); } );

        var ic = document.createElement('i');
        ic.className = 'fa fa-trash';

        b.appendChild(ic);

        item.appendChild(b);

        var list = document.querySelector('#layers');
        list.appendChild(item);
        
        tr.nodes([image]);
    };
    imageObj.src = path;


    nextId++;
}

function makeTransparent(aImg) {

    var w = typeof aImg.naturalWidth == "undefined" ? aImg.width : aImg.naturalWidth;
    var h = typeof aImg.naturalHeight == "undefined" ? aImg.height : aImg.naturalHeight;
    var imageData = ctx.getImageData(0, 0, w, h);

    for (var x = 0; x < imageData.width; x++)
        for (var y = 0; y < imageData.height; y++) {
            var offset = (y * imageData.width + x) * 4;
            var r = imageData.data[offset];
            var g = imageData.data[offset + 1];
            var b = imageData.data[offset + 2];

            //if it is pure white, change its alpha to 0              
            if (r == 255 && g == 255 && b == 255)
                imageData.data[offset + 3] = 0;
        };

    ctx.putImageData(imageData, 0, 0);
}