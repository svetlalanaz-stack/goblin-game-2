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
        this.gameInterval = null;
        
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
        
        this.startGame();
    }
    
    startGame() {
        this.isRunning = true;
        this.board.showGoblin();
        
        this.gameInterval = setInterval(() => {
            if (!this.isRunning) return;
            
            if (this.board.isGoblinVisible()) {
                this.missGoblin();
            } else {
                this.board.showGoblin();
            }
        }, 1000);
    }
    
    stopGame() {
        this.isRunning = false;
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }
    
    hitGoblin() {
        if (!this.isRunning) return;
        
        this.score.addPoint();
        this.board.hideGoblin();
    }
    
    missGoblin() {
        if (!this.isRunning) return;
        
        this.score.addMiss();
        this.board.hideGoblin();
        
        if (this.score.getMisses() >= Game.MAX_MISSES) {
            this.gameOver();
        }
    }
    
    gameOver() {
        this.stopGame();
        this.board.hideGoblin();
        
        const gameOverDiv = document.getElementById('game-over');
        if (gameOverDiv) {
            gameOverDiv.style.display = 'block';
        }
    }
    
    restart() {
        this.stopGame();
        this.score.reset();
        this.board.hideGoblin();
        
        const gameOverDiv = document.getElementById('game-over');
        if (gameOverDiv) {
            gameOverDiv.style.display = 'none';
        }
        
        this.startGame();
    }
}