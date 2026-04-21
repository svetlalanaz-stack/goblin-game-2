export default class Board {
    static FIELD_SIZE = 4;
    
    constructor() {
        this.cells = [];
        this.goblinElement = null;
        this.currentPosition = null;
        this.onGoblinClick = null;
        this.onMiss = null;
    }
    
    create() {
        const gameField = document.getElementById('game-field');
        if (!gameField) return;
        
        const totalCells = Board.FIELD_SIZE * Board.FIELD_SIZE;
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'hole';
            cell.dataset.index = i;
            
            cell.addEventListener('click', () => {
                if (this.currentPosition === i && this.isGoblinVisible()) {
                    if (this.onGoblinClick) this.onGoblinClick();
                } else {
                    if (this.onMiss) this.onMiss();
                }
            });
            
            gameField.append(cell);
            this.cells.push(cell);
        }
        
        this.createGoblin();
    }
    
    createGoblin() {
        this.goblinElement = document.createElement('img');
        this.goblinElement.className = 'goblin';
        this.goblinElement.alt = 'Goblin';
        
        const goblinImage = require('../goblin.png');
        this.goblinElement.src = goblinImage;
    }
    
    showGoblin() {
        let newPosition;
        const totalCells = Board.FIELD_SIZE * Board.FIELD_SIZE;
        
        do {
            newPosition = Math.floor(Math.random() * totalCells);
        } while (newPosition === this.currentPosition);
        
        if (this.currentPosition !== null) {
            const oldCell = this.cells[this.currentPosition];
            if (oldCell.contains(this.goblinElement)) {
                oldCell.removeChild(this.goblinElement);
            }
        }
        
        const newCell = this.cells[newPosition];
        newCell.append(this.goblinElement);
        this.currentPosition = newPosition;
    }
    
    hideGoblin() {
        if (this.currentPosition !== null) {
            const cell = this.cells[this.currentPosition];
            if (cell.contains(this.goblinElement)) {
                cell.removeChild(this.goblinElement);
            }
            this.currentPosition = null;
        }
    }
    
    isGoblinVisible() {
        return this.currentPosition !== null && 
               this.cells[this.currentPosition]?.contains(this.goblinElement);
    }
}