const gridContainer = document.querySelector('.grid-container');
const gridSizeInput = document.querySelector('#grid-size-input');
const createGridButton = document.querySelector('#create-grid');
const resetGridButton = document.querySelector('#reset-grid');

createGridButton.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 4 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a number between 4 and 100.');
    }
});

resetGridButton.addEventListener('click', () => {
    resetGrid();
});

const gridState = {};

function createGrid(size) {
    gridContainer.innerHTML = '';

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (i = 0; i < size * size; i++){
        const childDiv = document.createElement('div');
        childDiv.classList.add('grid-item');
        gridContainer.appendChild(childDiv);
        gridState[i] = { hovered: false, rgb: false, hoverCount: 0};
    }

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem, index) => {
        gridItem.addEventListener('mouseenter', () => {
            if (!gridState[index].hovered) {
                gridState[index].rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
                gridItem.style.backgroundColor = `rgb(${gridState[index].rgb[0]}, ${gridState[index].rgb[1]}, ${gridState[index].rgb[2]})`;
                gridState[index].hovered = true;
            } else if (gridState[index].hovered && gridState[index].hoverCount < 9) {
                gridState[index].hoverCount++;
                gridState[index].rgb = gridState[index].rgb.map(color => color * 0.9);
                gridItem.style.backgroundColor = `rgb(${gridState[index].rgb[0]}, ${gridState[index].rgb[1]}, ${gridState[index].rgb[2]})`;
            } else if (gridState[index].hovered && gridState[index].hoverCount === 9) {
                gridState[index].rgb = [0, 0, 0];
                gridItem.style.backgroundColor = 'rgb(0, 0, 0)';
            }
        });
    });
}

function resetGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = '';
    });
}