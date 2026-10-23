// Whack-A-Mole Deluxe - Pure JavaScript Version
// This script creates its own styles, HTML structure, and game logic dynamically.

(function () {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --bg: #0f172a; --accent: #38bdf8; --danger: #ef4444; }
        body { margin: 0; background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
        #game-container { width: 800px; height: 650px; background: #1e293b; border-radius: 20px; border: 2px solid var(--accent); position: relative; display: flex; flex-direction: column; box-sizing: border-box; }
        .hud { display: flex; justify-content: space-between; padding: 20px; background: rgba(0,0,0,0.3); border-bottom: 2px solid var(--accent); font-weight: bold; }
        .grid { display: grid; gap: 15px; padding: 30px; flex-grow: 1; }
        .hole { background: #0f172a; border-radius: 50%; border: 4px solid #334155; position: relative; overflow: hidden; cursor: crosshair; }
        .mole { width: 100%; height: 100%; position: absolute; bottom: -100%; display: flex; justify-content: center; align-items: center; font-size: 40px; transition: 0.2s; user-select: none; }
        .mole.up { bottom: 0; }
        #overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.9); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10; gap: 20px; border-radius: 20px; }
        .game-btn { padding: 15px 30px; font-size: 1.2rem; background: var(--accent); border: none; border-radius: 10px; cursor: pointer; color: white; font-weight: bold; transition: background 0.2s; }
        .game-btn:hover { background: #0ea5e9; }
        #high-score-display { font-size: 1.2rem; color: var(--accent); margin-top: 10px; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure
    const container = document.createElement('div');
    container.id = 'game-container';
    container.innerHTML = `
        <div class="hud">
            <div>SCORE: <span id="score">0</span></div>
            <div>BEST: <span id="high-score">0</span></div>
            <div>TIME: <span id="time">60</span>s</div>
        </div>
        <div id="board" class="grid"></div>
        <div id="overlay">
            <h1>WHACK-A-MOLE DELUXE</h1>
            <div id="high-score-display">ALL-TIME BEST: 0</div>
            <div id="difficulty-menu" style="display: flex; gap: 10px;">
                <button class="game-btn" data-grid="3" data-speed="1000">EASY</button>
                <button class="game-btn" data-grid="4" data-speed="700">MEDIUM</button>
                <button class="game-btn" data-grid="5" data-speed="400">HARD</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // 3. Game Logic & Audio Engine
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtxInstance = null;

    function playSound(freq, type, duration) {
        try {
            if (!audioCtxInstance) audioCtxInstance = new AudioCtx();
            const osc = audioCtxInstance.createOscillator();
            const gain = audioCtxInstance.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtxInstance.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtxInstance.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtxInstance.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtxInstance.destination);
            osc.start();
            osc.stop(audioCtxInstance.currentTime + duration);
        } catch (e) {
            // Audio context might be blocked before user interaction
        }
    }

    const StorageManager = {
        getHighScore() { return localStorage.getItem('whackHighScore') || 0; },
        setHighScore(score) { localStorage.setItem('whackHighScore', score); }
    };

    const Game = {
        score: 0, 
        time: 60, 
        active: false, 
        speed: 1000,
        timerInterval: null,
        loopTimeout1: null,
        loopTimeout2: null,
        
        init(gridSize, speed) {
            this.speed = speed;
            this.score = 0;
            this.time = 60;
            
            // Clear any lingering timers if restarting
            clearInterval(this.timerInterval);
            clearTimeout(this.loopTimeout1);
            clearTimeout(this.loopTimeout2);

            document.getElementById('score').innerText = '0';
            document.getElementById('high-score').innerText = StorageManager.getHighScore();
            document.getElementById('high-score-display').innerText = `ALL-TIME BEST: ${StorageManager.getHighScore()}`;
            
            const board = document.getElementById('board');
            board.innerHTML = '';
            board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
            board.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
            
            for(let i = 0; i < gridSize * gridSize; i++) {
                const hole = document.createElement('div');
                hole.className = 'hole';
                const mole = document.createElement('div');
                mole.className = 'mole';
                mole.innerText = '🐹';
                
                mole.addEventListener('mousedown', () => this.hit(mole));
                hole.appendChild(mole);
                board.appendChild(hole);
            }
            this.start();
        },

        start() {
            document.getElementById('overlay').style.display = 'none';
            this.active = true;
            this.loop();
            
            this.timerInterval = setInterval(() => {
                this.time--;
                const timeEl = document.getElementById('time');
                if (timeEl) timeEl.innerText = this.time;
                
                if(this.time <= 0) {  
                    this.active = false;  
                    clearInterval(this.timerInterval);
                    clearTimeout(this.loopTimeout1);
                    clearTimeout(this.loopTimeout2);
                    this.checkHighScore();
                    alert('Game Over! Score: ' + this.score);  
                    location.reload();  
                }
            }, 1000);
        },

        hit(mole) {
            if(!this.active || !mole.classList.contains('up')) return;
            playSound(600, 'sine', 0.1);
            this.score += 10;
            document.getElementById('score').innerText = this.score;
            mole.classList.remove('up');
        },

        checkHighScore() {
            if(this.score > StorageManager.getHighScore()) {
                StorageManager.setHighScore(this.score);
            }
        },

        loop() {
            if(!this.active) return;
            const moles = document.querySelectorAll('.mole');
            if (moles.length === 0) return;
            
            const target = moles[Math.floor(Math.random() * moles.length)];
            target.classList.add('up');
            
            this.loopTimeout1 = setTimeout(() => target.classList.remove('up'), this.speed);
            this.loopTimeout2 = setTimeout(() => this.loop(), this.speed + 100);
        }
    };
    
    // Set initial High Score display on load
    document.getElementById('high-score').innerText = StorageManager.getHighScore();

    // Bind event listeners to difficulty buttons dynamically
    document.querySelectorAll('#difficulty-menu button').forEach(button => {
        button.addEventListener('click', (e) => {
            const gridSize = parseInt(e.target.getAttribute('data-grid'));
            const speed = parseInt(e.target.getAttribute('data-speed'));
            Game.init(gridSize, speed);
        });
    });
})();