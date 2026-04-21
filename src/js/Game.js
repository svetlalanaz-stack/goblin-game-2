import Board from './Board';
import Score from './Score';
import Cursor from './Cursor';

export default class Game {
    static MAX_MISSES = 5;
    
    constructor() {
        this.board = new Board();
        this.score = new Score();
        this.cursor = new Cursor();
        this.isRunning = true;
        this.currentTimeout = null;
        
        this.init();
    }
    
    init() {
        this.board.create();
        this.cursor.init();
        this.score.updateDisplay();
        this.board.onGoblinClick = () => this.hitGoblin();
        this.board.onMiss = () => this.missGoblin();
        
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restart());
        }
        
        this.startRound();
    }
    
    startRound() {
        if (!this.isRunning) return;
        
        this.board.showGoblin();
        
        this.currentTimeout = setTimeout(() => {
            if (this.isRunning && this.board.isGoblinVisible()) {
                this.missGoblin();
            }
        }, 1000);
    }
    
    hitGoblin() {
        if (!this.isRunning) return;
        
        clearTimeout(this.currentTimeout);
        this.score.addPoint();
        this.board.hideGoblin();
        this.startRound();
    }
    
    missGoblin() {
        if (!this.isRunning) return;
        
        clearTimeout(this.currentTimeout);
        this.score.addMiss();
        this.board.hideGoblin();
        
        if (this.score.getMisses() >= Game.MAX_MISSES) {
            this.gameOver();
        } else {
            this.startRound();
        }
    }
    
    gameOver() {
        this.isRunning = false;
        clearTimeout(this.currentTimeout);
        this.board.hideGoblin();
        
        const gameOverDiv = document.getElementById('game-over');
        if (gameOverDiv) {
            gameOverDiv.style.display = 'block';
        }
    }
    
    restart() {
        this.isRunning = true;
        this.score.reset();
        this.board.hideGoblin();
        
        const gameOverDiv = document.getElementById('game-over');
        if (gameOverDiv) {
            gameOverDiv.style.display = 'none';
        }
        
        this.startRound();
    }
}