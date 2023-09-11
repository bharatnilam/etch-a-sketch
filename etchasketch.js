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

function createGrid(size) {
    gridContainer.innerHTML = '';

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (i = 0; i < size * size; i++){
        const childDiv = document.createElement('div');
        childDiv.classList.add('grid-item');
        gridContainer.appendChild(childDiv);
    }

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseenter', () => {
            gridItem.classList.add('hovered');
        });
    });
}

function resetGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.classList.remove('hovered');
    });
}