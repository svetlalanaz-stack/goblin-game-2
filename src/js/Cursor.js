import hammerImage from '../hammer.png';

export default class Cursor {
    constructor() {
        this.cursorElement = null;
    }
    
    init() {
        this.cursorElement = document.createElement('div');
        this.cursorElement.className = 'custom-cursor';
        
        const img = document.createElement('img');
        img.src = hammerImage;
        img.alt = 'Hammer';
        
        this.cursorElement.append(img);
        document.body.append(this.cursorElement);
        
        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e.clientX, e.clientY);
        });
        
        const gameField = document.getElementById('game-field');
        if (gameField) {
            gameField.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'none';
            });
            gameField.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
                this.cursorElement.style.display = 'none';
            });
            gameField.addEventListener('mousemove', () => {
                this.cursorElement.style.display = 'block';
            });
        }
    }
    
    moveCursor(x, y) {
        if (this.cursorElement) {
            this.cursorElement.style.left = `${x}px`;
            this.cursorElement.style.top = `${y}px`;
        }
    }
}