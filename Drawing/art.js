document.addEventListener('DOMContentLoaded', () => {
    var draw = SVG().addTo('#drawingArea').size(500, 500);
    const drawingArea = document.getElementById('drawingArea');
    const drawingName = document.getElementById('drawingName');
    const docColorField = document.getElementById('documentColor');
    const shapeSelect = document.querySelector('select'); /* REQUIREMENT querySelector 1/2 */
    const heightField = document.getElementById('height');
    const widthField = document.getElementById('width');
    const shapeColorField = document.getElementById('shapeColor');
    const saveButton = document.getElementById('save');
    let title = document.querySelector('title'); /* REQUIREMENT querySelector 2/2 */
    let hoverShape = document.getElementById('cursor');
    let shapeArray = [];
    heightField.value = '100';
    widthField.value = '100';
    if (localStorage.pageToDisplay !== 'New Drawing') {
        let info = JSON.parse(localStorage[localStorage.pageToDisplay]);
        console.log(info.pageColor);
        console.log(title.value);
        drawingName.value = info.title;
        docColorField.value = info.pageColor;
        drawingArea.style.backgroundColor = info.pageColor;
        for (let i = 0; i < info.shapes.length; i++) {
            let newShape = new Shape(info.shapes[i].shapeType, info.shapes[i].height, info.shapes[i].width, info.shapes[i].color, info.shapes[i].x, info.shapes[i].y);
                let newShapeDiv = document.createElement('div');
                newShapeDiv.className = newShape.shapeType;
                newShapeDiv.style.position = 'absolute';
                newShapeDiv.style.left = `${newShape.x}px`;
                newShapeDiv.style.top = `${newShape.y}px`;
                newShapeDiv.style.width = `${newShape.width}px`;
                newShapeDiv.style.height = `${newShape.height}px`;
                newShapeDiv.style.backgroundColor = newShape.color;
                console.log(newShape);
                shapeArray.push(newShape);
                console.log(shapeArray);
                drawingArea.append(newShapeDiv);
        }
    }

    document.addEventListener('mousemove', (e) => { /* REQUIREMENT addEventListener 1/2 */
        var x = e.clientX;
        var y = e.clientY;
        hoverShape.classList = shapeSelect.value;
        hoverShape.style.width = widthField.value + 'px';
        hoverShape.style.height = heightField.value + 'px';
        hoverShape.style.left = x + 'px';
        hoverShape.style.top = y + 'px';
        hoverShape.style.backgroundColor = shapeColorField.value;
    });
    drawingName.addEventListener('change', () => { /* REQUIREMENT addEventListener 2/2 */
        title.innerHTML = drawingName.value;
    });
    docColorField.addEventListener('change', () => {
        drawingArea.style.backgroundColor = docColorField.value;        
    });
    shapeSelect.addEventListener('change', () => {
        hoverShape.classList = shapeSelect.value;
    });
    widthField.addEventListener('change', () => {
        hoverShape.width = widthField.value;
    });
    heightField.addEventListener('change', () => {
        hoverShape.height = heightField.value;
    });
    drawingArea.addEventListener('click', async (e) => {
        if (widthField.value != '' && heightField.value != '') {
            if (shapeSelect.value != "Ephraim's Weather") {
                console.log(shapeSelect.value);
                let newShape = new Shape(shapeSelect.value, heightField.value, widthField.value, shapeColorField.value, e.clientX, e.clientY);
                let newShapeDiv = document.createElement('div');
                newShapeDiv.className = newShape.shapeType;
                newShapeDiv.style.position = 'absolute';
                newShapeDiv.style.left = `${newShape.x}px`;
                newShapeDiv.style.top = `${newShape.y}px`;
                newShapeDiv.style.width = `${newShape.width}px`;
                newShapeDiv.style.height = `${newShape.height}px`;
                newShapeDiv.style.backgroundColor = newShape.color;
                console.log(newShape);
                shapeArray.push(newShape);
                console.log(shapeArray);
                drawingArea.append(newShapeDiv);
            }
            else {
                console.log(shapeSelect.value)
                let data = await fetch("https://api.weather.gov/gridpoints/SLC/103,111/forecast") /* REQUIREMENT ajax to ineract with API */
                let info = await data.json();
                let imgSrc = info.properties.periods[0].icon;
                let imgAlt = info.properties.periods[0].shortForecast;
                let img = document.createElement('img'); /* REQUIREMENT img with alt attribute */
                img.setAttribute('src', imgSrc);
                img.setAttribute('alt', imgAlt);
                img.style.position = 'absolute';
                img.style.left = `${e.clientX}px`;
                img.style.top = `${e.clientY}px`;
                drawingArea.append(img);
            }
        }
    });
    saveButton.addEventListener('click',  () => {
        let drawingObj = {'title': drawingName.value, 'pageColor': docColorField.value, 'shapes': shapeArray };
        localStorage.setItem(drawingName.value, JSON.stringify(drawingObj));
    });
});

class Shape { /* REQUIREMENT javascript class */
    constructor(type, height, width, color, xPosition, yPosition) {
        this.shapeType = type;
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = xPosition;
        this.y = yPosition;
    }
}

function newFunction(parameter) {
    window.alert(parameter);
}