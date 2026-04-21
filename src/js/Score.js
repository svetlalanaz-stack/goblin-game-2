export default class Score {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.scoreElement = document.getElementById('score');
        this.missesElement = document.getElementById('misses');
    }
    
    addPoint() {
        this.score++;
        this.updateDisplay();
    }
    
    addMiss() {
        this.misses++;
        this.updateDisplay();
    }
    
    updateDisplay() {
        if (this.scoreElement) {
            this.scoreElement.textContent = this.score;
        }
        if (this.missesElement) {
            this.missesElement.textContent = this.misses;
        }
    }
    
    reset() {
        this.score = 0;
        this.misses = 0;
        this.updateDisplay();
    }
    
    getMisses() {
        return this.misses;
    }
}