(() => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.__runnerGameBooted) {
    return;
  }
  window.__runnerGameBooted = true;

  const STYLE_ID = "runner-game-style";
  const STORAGE_KEY = "runner-game-high-score";
  const GAME_TITLE = "Sky Runner";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function formatScore(value) {
    return Math.floor(value).toString().padStart(5, "0");
  }

  function readBestScore() {
    try {
      return Math.max(0, Number.parseInt(window.localStorage.getItem(STORAGE_KEY) || "0", 10) || 0);
    } catch (_error) {
      return 0;
    }
  }

  function saveBestScore(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch (_error) {
      // Ignore storage failures. The game still works.
    }
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --runner-bg-a: #051321;
        --runner-bg-b: #11324b;
        --runner-panel: rgba(6, 16, 28, 0.84);
        --runner-panel-edge: rgba(255, 255, 255, 0.08);
        --runner-text: #e6f1fb;
        --runner-muted: #9eb9cf;
        --runner-accent: #57b0ff;
        --runner-accent-2: #9df3c4;
        --runner-danger: #ff7f72;
        --runner-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      }

      .runner-game-root {
        width: min(960px, calc(100vw - 32px));
        margin: 24px auto;
        color: var(--runner-text);
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .runner-shell {
        border-radius: 24px;
        border: 1px solid var(--runner-panel-edge);
        background:
          radial-gradient(circle at top left, rgba(87, 176, 255, 0.14), transparent 35%),
          radial-gradient(circle at top right, rgba(157, 243, 196, 0.1), transparent 32%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
          var(--runner-panel);
        box-shadow: var(--runner-shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
      }

      .runner-topbar {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: start;
        padding: 18px 20px 10px;
      }

      .runner-title-wrap {
        display: grid;
        gap: 6px;
      }

      .runner-kicker {
        margin: 0;
        color: var(--runner-accent);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 11px;
        font-weight: 700;
      }

      .runner-title {
        margin: 0;
        font-size: clamp(28px, 4vw, 40px);
        line-height: 1;
        letter-spacing: -0.03em;
      }

      .runner-subtitle {
        margin: 0;
        color: var(--runner-muted);
        font-size: 14px;
      }

      .runner-metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(92px, 1fr));
        gap: 10px;
        width: min(420px, 100%);
      }

      .runner-metric {
        border-radius: 16px;
        border: 1px solid var(--runner-panel-edge);
        background: rgba(255, 255, 255, 0.04);
        padding: 12px 14px;
      }

      .runner-metric-label {
        display: block;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--runner-muted);
        font-weight: 700;
      }

      .runner-metric-value {
        display: block;
        margin-top: 8px;
        font-size: 24px;
        font-weight: 800;
        line-height: 1;
      }

      .runner-stage-wrap {
        padding: 10px 20px 14px;
      }

      .runner-stage {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(180deg, var(--runner-bg-b), var(--runner-bg-a));
      }

      .runner-canvas {
        display: block;
        width: 100%;
        height: 360px;
        touch-action: none;
      }

      .runner-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        pointer-events: none;
      }

      .runner-overlay-card {
        max-width: 420px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(4, 13, 22, 0.72);
        backdrop-filter: blur(10px);
        padding: 18px 20px;
        text-align: center;
        box-shadow: var(--runner-shadow);
      }

      .runner-overlay-card.hidden {
        display: none;
      }

      .runner-overlay-title {
        margin: 0;
        font-size: 28px;
        line-height: 1;
      }

      .runner-overlay-copy {
        margin: 10px 0 0;
        color: var(--runner-muted);
        font-size: 14px;
        line-height: 1.5;
      }

      .runner-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 20px;
      }

      .runner-actions,
      .runner-touch-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .runner-button {
        appearance: none;
        border: 0;
        border-radius: 999px;
        background: var(--runner-accent);
        color: #08131e;
        padding: 11px 18px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: transform 120ms ease, filter 120ms ease, background-color 120ms ease;
      }

      .runner-button:hover {
        filter: brightness(1.06);
      }

      .runner-button:active,
      .runner-button.is-held {
        transform: translateY(1px) scale(0.99);
      }

      .runner-button.secondary {
        background: rgba(255, 255, 255, 0.08);
        color: var(--runner-text);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .runner-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        filter: none;
      }

      .runner-help {
        margin: 0;
        color: var(--runner-muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .runner-help strong {
        color: var(--runner-text);
      }

      @media (max-width: 760px) {
        .runner-topbar,
        .runner-controls {
          flex-direction: column;
          align-items: stretch;
        }

        .runner-metrics {
          width: 100%;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .runner-canvas {
          height: 300px;
        }

        .runner-actions,
        .runner-touch-controls {
          width: 100%;
        }

        .runner-button {
          flex: 1 1 0;
          justify-content: center;
          text-align: center;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function ensureMountNode() {
    const existing = document.getElementById("runner-game");
    if (existing) {
      return existing;
    }

    const mount = document.createElement("section");
    mount.id = "runner-game";
    mount.className = "runner-game-root";
    document.body.prepend(mount);
    return mount;
  }

  class RunnerGame {
    constructor(mount) {
      this.mount = mount;
      this.bestScore = readBestScore();
      this.lastTimestamp = 0;
      this.score = 0;
      this.distance = 0;
      this.flashTimer = 0;
      this.state = "ready";
      this.obstacles = [];
      this.clouds = [];
      this.stars = [];
      this.mountains = [];
      this.spawnTimer = 0;
      this.cloudTimer = 0;
      this.starDrift = 0;
      this.groundOffset = 0;
      this.difficulty = 1;
      this.speed = 0;
      this.jumpBuffer = 0;
      this.lastJumpPressed = false;
      this.input = {
        jumpHeld: false,
        duckHeld: false,
      };

      this._buildMarkup();
      this._bindElements();
      this._bindHandlers();
      this._setupWorld();
      this._resetRound(false);
      this._updateHud();
      this._syncButtons();
      this._syncOverlay();

      requestAnimationFrame((timestamp) => this._loop(timestamp));
    }

    _buildMarkup() {
      this.mount.classList.add("runner-game-root");
      this.mount.innerHTML = `
        <div class="runner-shell">
          <div class="runner-topbar">
            <div class="runner-title-wrap">
              <p class="runner-kicker">Standalone Runner Game</p>
              <h1 class="runner-title">${GAME_TITLE}</h1>
              <p class="runner-subtitle">Jump cacti, duck patrol drones, and survive as long as possible.</p>
            </div>
            <div class="runner-metrics">
              <div class="runner-metric">
                <span class="runner-metric-label">Score</span>
                <span class="runner-metric-value" data-role="score">00000</span>
              </div>
              <div class="runner-metric">
                <span class="runner-metric-label">Best</span>
                <span class="runner-metric-value" data-role="best">00000</span>
              </div>
              <div class="runner-metric">
                <span class="runner-metric-label">State</span>
                <span class="runner-metric-value" data-role="state">Ready</span>
              </div>
            </div>
          </div>

          <div class="runner-stage-wrap">
            <div class="runner-stage">
              <canvas class="runner-canvas" aria-label="Runner game canvas"></canvas>
              <div class="runner-overlay">
                <div class="runner-overlay-card" data-role="overlay-card">
                  <h2 class="runner-overlay-title" data-role="overlay-title">Ready</h2>
                  <p class="runner-overlay-copy" data-role="overlay-copy"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="runner-controls">
            <div class="runner-actions">
              <button type="button" class="runner-button" data-action="primary">Start</button>
              <button type="button" class="runner-button secondary" data-action="pause">Pause</button>
            </div>

            <p class="runner-help">
              <strong>Keyboard:</strong> Space / W / Up jump, S / Down duck, P pause, R restart. Jump cacti. Duck drones.
            </p>

            <div class="runner-touch-controls">
              <button type="button" class="runner-button secondary" data-action="jump">Jump</button>
              <button type="button" class="runner-button secondary" data-action="duck">Duck</button>
            </div>
          </div>
        </div>
      `;
    }

    _bindElements() {
      this.canvas = this.mount.querySelector(".runner-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.scoreEl = this.mount.querySelector('[data-role="score"]');
      this.bestEl = this.mount.querySelector('[data-role="best"]');
      this.stateEl = this.mount.querySelector('[data-role="state"]');
      this.overlayCard = this.mount.querySelector('[data-role="overlay-card"]');
      this.overlayTitle = this.mount.querySelector('[data-role="overlay-title"]');
      this.overlayCopy = this.mount.querySelector('[data-role="overlay-copy"]');
      this.primaryButton = this.mount.querySelector('[data-action="primary"]');
      this.pauseButton = this.mount.querySelector('[data-action="pause"]');
      this.jumpButton = this.mount.querySelector('[data-action="jump"]');
      this.duckButton = this.mount.querySelector('[data-action="duck"]');
    }

    _bindHandlers() {
      this._handleResize = this._handleResize.bind(this);
      this._handleKeyDown = this._handleKeyDown.bind(this);
      this._handleKeyUp = this._handleKeyUp.bind(this);
      this._handleVisibility = this._handleVisibility.bind(this);
      this._handlePointerStart = this._handlePointerStart.bind(this);
      this._handlePointerMove = this._handlePointerMove.bind(this);
      this._handlePointerEnd = this._handlePointerEnd.bind(this);

      window.addEventListener("resize", this._handleResize);
      document.addEventListener("keydown", this._handleKeyDown);
      document.addEventListener("keyup", this._handleKeyUp);
      document.addEventListener("visibilitychange", this._handleVisibility);

      this.primaryButton.addEventListener("click", () => {
        if (this.state === "running") {
          this._restart();
          return;
        }
        this._start();
      });

      this.pauseButton.addEventListener("click", () => {
        if (this.state === "ready") {
          return;
        }
        this._togglePause();
      });

      this.jumpButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        this.jumpButton.classList.add("is-held");
        this.input.jumpHeld = true;
        this._requestJump();
      });

      this.jumpButton.addEventListener("pointerup", () => {
        this.jumpButton.classList.remove("is-held");
        this.input.jumpHeld = false;
      });

      this.jumpButton.addEventListener("pointercancel", () => {
        this.jumpButton.classList.remove("is-held");
        this.input.jumpHeld = false;
      });

      this.duckButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        this.duckButton.classList.add("is-held");
        this.input.duckHeld = true;
      });

      const clearDuckButton = () => {
        this.duckButton.classList.remove("is-held");
        this.input.duckHeld = false;
      };

      this.duckButton.addEventListener("pointerup", clearDuckButton);
      this.duckButton.addEventListener("pointercancel", clearDuckButton);

      this.canvas.addEventListener("pointerdown", this._handlePointerStart);
      this.canvas.addEventListener("pointermove", this._handlePointerMove);
      this.canvas.addEventListener("pointerup", this._handlePointerEnd);
      this.canvas.addEventListener("pointercancel", this._handlePointerEnd);
    }

    _setupWorld() {
      const rect = this.canvas.getBoundingClientRect();
      this.cssWidth = Math.max(320, Math.floor(rect.width || this.mount.clientWidth || 640));
      this.cssHeight = window.innerWidth < 760 ? 300 : 360;
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      this.canvas.width = Math.floor(this.cssWidth * dpr);
      this.canvas.height = Math.floor(this.cssHeight * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.ctx.imageSmoothingEnabled = true;
      this.groundY = this.cssHeight - 52;

      if (!this.runner) {
        this.runner = {
          x: 90,
          y: 0,
          width: 46,
          height: 54,
          standingHeight: 54,
          duckHeight: 30,
          velocityY: 0,
          isGrounded: true,
          isDucking: false,
          trailPhase: 0,
        };
      }

      this.runner.y = this.groundY - this.runner.height;
      this._seedBackdrop();
    }

    _seedBackdrop() {
      if (this.clouds.length === 0) {
        for (let i = 0; i < 4; i += 1) {
          this.clouds.push(this._makeCloud(rand(0, this.cssWidth), rand(26, 120)));
        }
      }

      if (this.stars.length === 0) {
        for (let i = 0; i < 26; i += 1) {
          this.stars.push({
            x: rand(0, this.cssWidth),
            y: rand(16, this.cssHeight * 0.55),
            radius: rand(0.8, 2.1),
            pulse: rand(0, Math.PI * 2),
          });
        }
      }

      if (this.mountains.length === 0) {
        let cursor = -50;
        while (cursor < this.cssWidth + 180) {
          const width = rand(140, 240);
          this.mountains.push({
            x: cursor,
            width,
            height: rand(40, 90),
          });
          cursor += width * rand(0.55, 0.8);
        }
      }
    }

    _resetRound(keepState) {
      this.score = 0;
      this.distance = 0;
      this.flashTimer = 0;
      this.difficulty = 1;
      this.speed = 360;
      this.groundOffset = 0;
      this.jumpBuffer = 0;
      this.obstacles = [];
      this.spawnTimer = 1.25;
      this.cloudTimer = 1.8;
      this.starDrift = 0;
      this.runner.velocityY = 0;
      this.runner.height = this.runner.standingHeight;
      this.runner.isGrounded = true;
      this.runner.isDucking = false;
      this.runner.y = this.groundY - this.runner.height;
      this.input.jumpHeld = false;
      this.input.duckHeld = false;
      this.lastJumpPressed = false;
      if (!keepState) {
        this.state = "ready";
      }
    }

    _start() {
      this._resetRound(true);
      this.state = "running";
      this.lastTimestamp = 0;
      this._requestJump();
      this._updateHud();
      this._syncButtons();
      this._syncOverlay();
    }

    _restart() {
      this._resetRound(true);
      this.state = "running";
      this._updateHud();
      this._syncButtons();
      this._syncOverlay();
    }

    _togglePause() {
      if (this.state === "running") {
        this.state = "paused";
      } else if (this.state === "paused") {
        this.state = "running";
      }
      this._updateHud();
      this._syncButtons();
      this._syncOverlay();
    }

    _gameOver() {
      this.state = "gameover";
      this.flashTimer = 0.8;
      const score = Math.floor(this.score);
      if (score > this.bestScore) {
        this.bestScore = score;
        saveBestScore(score);
      }
      this._updateHud();
      this._syncButtons();
      this._syncOverlay();
    }

    _requestJump() {
      this.jumpBuffer = 0.16;
      if (this.state === "ready") {
        this._start();
        return;
      }
      if (this.state === "gameover") {
        this._restart();
        return;
      }
      if (this.state === "paused") {
        this._togglePause();
      }
    }

    _handleResize() {
      this._setupWorld();
      this._syncOverlay();
    }

    _handleVisibility() {
      if (document.hidden && this.state === "running") {
        this.state = "paused";
        this._updateHud();
        this._syncButtons();
        this._syncOverlay();
      }
    }

    _handleKeyDown(event) {
      const key = event.key;
      if ([" ", "ArrowUp", "w", "W", "ArrowDown", "s", "S", "p", "P", "r", "R"].includes(key)) {
        event.preventDefault();
      }

      if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
        if (!this.lastJumpPressed) {
          this.lastJumpPressed = true;
          this.input.jumpHeld = true;
          this._requestJump();
        }
        return;
      }

      if (key === "ArrowDown" || key === "s" || key === "S") {
        this.input.duckHeld = true;
        return;
      }

      if (key === "p" || key === "P") {
        if (this.state !== "ready") {
          this._togglePause();
        }
        return;
      }

      if (key === "r" || key === "R") {
        this._restart();
      }
    }

    _handleKeyUp(event) {
      const key = event.key;
      if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
        this.lastJumpPressed = false;
        this.input.jumpHeld = false;
        return;
      }

      if (key === "ArrowDown" || key === "s" || key === "S") {
        this.input.duckHeld = false;
      }
    }

    _handlePointerStart(event) {
      event.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const isDuckZone = localY > rect.height * 0.7 || localX > rect.width * 0.72;
      if (isDuckZone) {
        this.input.duckHeld = true;
      } else {
        this.input.jumpHeld = true;
        this._requestJump();
      }
    }

    _handlePointerMove(event) {
      if ((event.buttons & 1) !== 1) {
        return;
      }
      const rect = this.canvas.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      this.input.duckHeld = localY > rect.height * 0.7 || localX > rect.width * 0.72;
    }

    _handlePointerEnd() {
      this.input.jumpHeld = false;
      this.input.duckHeld = false;
    }

    _makeCloud(x, y) {
      return {
        x,
        y,
        width: rand(60, 130),
        height: rand(22, 38),
        speedFactor: rand(0.16, 0.3),
      };
    }

    _spawnObstacle() {
      const level = Math.floor(this.score / 120);
      const choices = [
        { type: "cactus-small", width: 28, height: 44, groundOffset: 0, hitInsetX: 5, hitInsetY: 4, bobAmplitude: 0 },
        { type: "cactus-tall", width: 34, height: 60, groundOffset: 0, hitInsetX: 5, hitInsetY: 4, bobAmplitude: 0 },
        { type: "cactus-wide", width: 56, height: 48, groundOffset: 0, hitInsetX: 6, hitInsetY: 4, bobAmplitude: 0 },
      ];

      if (level >= 1) {
        choices.push(
          { type: "drone-jump", width: 42, height: 24, groundOffset: 16, hitInsetX: 9, hitInsetY: 6, bobAmplitude: 6, speedBonus: 1.06, color: "#ffcc80" },
          { type: "drone-duck", width: 62, height: 18, groundOffset: 24, hitInsetX: 12, hitInsetY: 4, bobAmplitude: 1.5, speedBonus: 1.02, color: "#9fe8ff" },
          { type: "drone-duck", width: 62, height: 18, groundOffset: 26, hitInsetX: 12, hitInsetY: 4, bobAmplitude: 1.5, speedBonus: 1.02, color: "#9fe8ff" }
        );
      }
      if (level >= 3) {
        choices.push(
          { type: "drone-jump-fast", width: 46, height: 22, groundOffset: 14, hitInsetX: 10, hitInsetY: 6, bobAmplitude: 8, speedBonus: 1.14, color: "#ffd58a" },
          { type: "drone-duck-wide", width: 72, height: 16, groundOffset: 27, hitInsetX: 15, hitInsetY: 4, bobAmplitude: 1.25, speedBonus: 1.06, color: "#86f7d3" },
          { type: "drone-duck-wide", width: 72, height: 16, groundOffset: 29, hitInsetX: 15, hitInsetY: 4, bobAmplitude: 1.25, speedBonus: 1.06, color: "#86f7d3" }
        );
      }

      const template = choices[randInt(0, choices.length - 1)];
      const obstacle = {
        ...template,
        x: this.cssWidth + rand(20, 80),
        baseY: this.groundY - template.height - template.groundOffset,
        y: this.groundY - template.height - template.groundOffset,
        bob: rand(0, Math.PI * 2),
        bobSpeed: rand(4, 7),
        speedBonus: template.speedBonus || rand(0.94, 1.12),
      };
      this.obstacles.push(obstacle);
      this.spawnTimer = clamp(rand(0.85, 1.45) - this.difficulty * 0.05, 0.52, 1.35);
    }

    _updateRunner(dt) {
      const runner = this.runner;
      const targetHeight = this.input.duckHeld && runner.isGrounded ? runner.duckHeight : runner.standingHeight;
      if (targetHeight !== runner.height) {
        runner.y += runner.height - targetHeight;
        runner.height = targetHeight;
        runner.isDucking = targetHeight === runner.duckHeight;
      }

      if (this.jumpBuffer > 0) {
        this.jumpBuffer -= dt;
        if (runner.isGrounded) {
          runner.velocityY = -760;
          runner.isGrounded = false;
          this.jumpBuffer = 0;
        }
      }

      if (!this.input.jumpHeld && runner.velocityY < -240) {
        runner.velocityY += 2100 * dt;
      }

      runner.velocityY += 2200 * dt;
      runner.y += runner.velocityY * dt;
      runner.trailPhase += dt * 14;

      const floorY = this.groundY - runner.height;
      if (runner.y >= floorY) {
        runner.y = floorY;
        runner.velocityY = 0;
        runner.isGrounded = true;
      }
    }

    _updateBackdrop(dt) {
      this.cloudTimer -= dt;
      if (this.cloudTimer <= 0) {
        this.clouds.push(this._makeCloud(this.cssWidth + rand(10, 120), rand(26, 120)));
        this.cloudTimer = rand(2.3, 5.2);
      }

      for (const cloud of this.clouds) {
        cloud.x -= this.speed * cloud.speedFactor * dt;
      }
      this.clouds = this.clouds.filter((cloud) => cloud.x + cloud.width > -40);

      for (const mountain of this.mountains) {
        mountain.x -= this.speed * 0.08 * dt;
      }
      this.mountains = this.mountains.filter((item) => item.x + item.width > -120);
      let cursor = this.mountains.reduce((max, item) => Math.max(max, item.x + item.width), 0);
      while (this.mountains.length < 6) {
        const width = rand(140, 240);
        cursor += rand(20, 60);
        this.mountains.push({
          x: Math.max(cursor, this.cssWidth * 0.45),
          width,
          height: rand(40, 90),
        });
        cursor += width;
      }

      this.starDrift += dt;
      this.groundOffset = (this.groundOffset + this.speed * dt) % 34;
    }

    _updateObstacles(dt) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        this._spawnObstacle();
      }

      for (const obstacle of this.obstacles) {
        obstacle.x -= this.speed * obstacle.speedBonus * dt;
        obstacle.bob += obstacle.bobSpeed * dt;
        if (obstacle.type.startsWith("drone")) {
          obstacle.y = obstacle.baseY + Math.sin(obstacle.bob) * obstacle.bobAmplitude;
        }
      }
      this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -60);
    }

    _checkCollisions() {
      const runner = this.runner;
      const playerBox = {
        x: runner.x + 8,
        y: runner.y + 6,
        width: runner.width - 16,
        height: runner.height - 8,
      };

      for (const obstacle of this.obstacles) {
        const insetX = obstacle.hitInsetX || 4;
        const insetY = obstacle.hitInsetY || 4;
        const hitbox = {
          x: obstacle.x + insetX,
          y: obstacle.y + insetY,
          width: obstacle.width - insetX * 2,
          height: obstacle.height - insetY * 2,
        };

        const separated =
          playerBox.x + playerBox.width < hitbox.x ||
          playerBox.x > hitbox.x + hitbox.width ||
          playerBox.y + playerBox.height < hitbox.y ||
          playerBox.y > hitbox.y + hitbox.height;

        if (!separated) {
          this._gameOver();
          return;
        }
      }
    }

    _update(dt) {
      if (this.flashTimer > 0) {
        this.flashTimer = Math.max(0, this.flashTimer - dt);
      }

      if (this.state !== "running") {
        return;
      }

      this.difficulty = 1 + this.score / 280;
      this.speed = clamp(360 + this.difficulty * 26, 360, 720);
      this.distance += this.speed * dt;
      this.score += dt * (20 + this.difficulty * 6.5);

      this._updateBackdrop(dt);
      this._updateRunner(dt);
      this._updateObstacles(dt);
      this._checkCollisions();
      this._updateHud();
      this._syncButtons();
    }

    _getSkyPalette() {
      const cycle = (Math.sin(this.score * 0.01) + 1) * 0.5;
      return {
        top: `rgb(${Math.round(lerp(5, 34, cycle))}, ${Math.round(lerp(19, 92, cycle))}, ${Math.round(lerp(33, 145, cycle))})`,
        bottom: `rgb(${Math.round(lerp(17, 92, cycle))}, ${Math.round(lerp(50, 149, cycle))}, ${Math.round(lerp(75, 211, cycle))})`,
        glow: `rgba(${Math.round(lerp(255, 123, cycle))}, ${Math.round(lerp(214, 205, cycle))}, ${Math.round(lerp(140, 255, cycle))}, 0.22)`,
      };
    }

    _drawBackground() {
      const palette = this._getSkyPalette();
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.cssHeight);
      gradient.addColorStop(0, palette.top);
      gradient.addColorStop(1, palette.bottom);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.cssWidth, this.cssHeight);

      this.ctx.fillStyle = palette.glow;
      this.ctx.beginPath();
      this.ctx.arc(this.cssWidth - 110, 78, 48, 0, Math.PI * 2);
      this.ctx.fill();

      for (const star of this.stars) {
        const alpha = 0.2 + ((Math.sin(this.starDrift * 2.5 + star.pulse) + 1) * 0.5) * 0.7;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.fillStyle = "rgba(10, 23, 38, 0.42)";
      for (const mountain of this.mountains) {
        this.ctx.beginPath();
        this.ctx.moveTo(mountain.x, this.groundY + 6);
        this.ctx.lineTo(mountain.x + mountain.width * 0.5, this.groundY - mountain.height);
        this.ctx.lineTo(mountain.x + mountain.width, this.groundY + 6);
        this.ctx.closePath();
        this.ctx.fill();
      }

      for (const cloud of this.clouds) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        this.ctx.beginPath();
        this.ctx.roundRect(cloud.x, cloud.y, cloud.width, cloud.height, 20);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.roundRect(cloud.x + 18, cloud.y - 10, cloud.width * 0.44, cloud.height, 18);
        this.ctx.fill();
      }
    }

    _drawGround() {
      this.ctx.fillStyle = "rgba(6, 18, 28, 0.82)";
      this.ctx.fillRect(0, this.groundY + 1, this.cssWidth, this.cssHeight - this.groundY);

      this.ctx.strokeStyle = "rgba(183, 226, 255, 0.35)";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.groundY + 1);
      this.ctx.lineTo(this.cssWidth, this.groundY + 1);
      this.ctx.stroke();

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      for (let x = -34 + this.groundOffset; x < this.cssWidth + 34; x += 34) {
        this.ctx.fillRect(x, this.groundY + 12, 18, 3);
      }
    }

    _drawRunner() {
      const runner = this.runner;
      const stride = Math.sin(runner.trailPhase) * (runner.isGrounded ? 1 : 0.35);

      this.ctx.save();
      this.ctx.translate(runner.x, runner.y);

      if (this.flashTimer > 0 && Math.floor(this.flashTimer * 20) % 2 === 0) {
        this.ctx.globalAlpha = 0.5;
      }

      this.ctx.fillStyle = "#dff8ff";
      this.ctx.beginPath();
      this.ctx.roundRect(10, 0, runner.width - 14, runner.height - 4, 10);
      this.ctx.fill();

      this.ctx.fillStyle = "#08131e";
      this.ctx.beginPath();
      this.ctx.arc(runner.width - 14, 12, 3.2, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = "#57b0ff";
      this.ctx.fillRect(6, 12, 12, 10);

      this.ctx.strokeStyle = "#9df3c4";
      this.ctx.lineWidth = 5;
      this.ctx.lineCap = "round";
      const legY = runner.height - 6;
      const legLift = runner.isGrounded ? stride * 6 : -4;
      this.ctx.beginPath();
      this.ctx.moveTo(18, legY - 8);
      this.ctx.lineTo(14, legY + legLift);
      this.ctx.moveTo(28, legY - 8);
      this.ctx.lineTo(30, legY - legLift);
      this.ctx.stroke();

      this.ctx.restore();
    }

    _drawObstacle(obstacle) {
      this.ctx.save();
      this.ctx.translate(obstacle.x, obstacle.y);

      if (obstacle.type.startsWith("cactus")) {
        this.ctx.fillStyle = "#9df3c4";
        this.ctx.beginPath();
        this.ctx.roundRect(0, 0, obstacle.width, obstacle.height, 8);
        this.ctx.fill();
        this.ctx.fillRect(6, 8, 5, obstacle.height - 12);
        this.ctx.fillRect(obstacle.width - 11, 10, 5, obstacle.height - 14);
      } else if (obstacle.type.includes("duck")) {
        this.ctx.fillStyle = obstacle.color || "#9fe8ff";
        this.ctx.beginPath();
        this.ctx.roundRect(0, 2, obstacle.width, obstacle.height - 4, 10);
        this.ctx.fill();
        this.ctx.fillStyle = "#08131e";
        this.ctx.fillRect(10, Math.max(4, obstacle.height * 0.35), obstacle.width - 20, 3);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        this.ctx.fillRect(8, obstacle.height - 5, 8, 2);
        this.ctx.fillRect(obstacle.width - 16, obstacle.height - 5, 8, 2);
      } else {
        this.ctx.fillStyle = obstacle.color || "#ffcc80";
        this.ctx.beginPath();
        this.ctx.ellipse(obstacle.width * 0.5, obstacle.height * 0.5, obstacle.width * 0.5, obstacle.height * 0.45, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "#08131e";
        this.ctx.fillRect(10, Math.max(6, obstacle.height * 0.35), obstacle.width - 20, 4);
      }

      this.ctx.restore();
    }

    _drawOverlay() {
      this._syncOverlay();
    }

    _render() {
      this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
      this._drawBackground();
      this._drawGround();

      for (const obstacle of this.obstacles) {
        this._drawObstacle(obstacle);
      }
      this._drawRunner();
      this._drawOverlay();
    }

    _syncButtons() {
      if (this.state === "ready") {
        this.primaryButton.textContent = "Start";
        this.pauseButton.textContent = "Pause";
        this.pauseButton.disabled = true;
      } else if (this.state === "running") {
        this.primaryButton.textContent = "Restart";
        this.pauseButton.textContent = "Pause";
        this.pauseButton.disabled = false;
      } else if (this.state === "paused") {
        this.primaryButton.textContent = "Restart";
        this.pauseButton.textContent = "Resume";
        this.pauseButton.disabled = false;
      } else {
        this.primaryButton.textContent = "Play Again";
        this.pauseButton.textContent = "Pause";
        this.pauseButton.disabled = true;
      }
    }

    _syncOverlay() {
      let title = "";
      let copy = "";
      let hidden = false;

      if (this.state === "ready") {
        title = "Ready";
        copy = "Press Start, tap the left side of the stage, or hit Space to jump into the first run. Jump cacti and duck patrol drones.";
      } else if (this.state === "paused") {
        title = "Paused";
        copy = "Resume with P, the Pause button, or any jump input.";
      } else if (this.state === "gameover") {
        title = "Game Over";
        copy = `Final score ${formatScore(this.score)}. Press R, Start, or jump to go again.`;
      } else {
        hidden = true;
      }

      this.overlayTitle.textContent = title;
      this.overlayCopy.textContent = copy;
      this.overlayCard.classList.toggle("hidden", hidden);
    }

    _updateHud() {
      this.scoreEl.textContent = formatScore(this.score);
      this.bestEl.textContent = formatScore(this.bestScore);
      const stateLabel = {
        ready: "Ready",
        running: "Live",
        paused: "Paused",
        gameover: "Crashed",
      }[this.state];
      this.stateEl.textContent = stateLabel;
    }

    _loop(timestamp) {
      const elapsed = this.lastTimestamp === 0 ? 0 : (timestamp - this.lastTimestamp) / 1000;
      this.lastTimestamp = timestamp;
      const dt = Math.min(0.033, elapsed || 0.016);

      this._update(dt);
      this._render();

      requestAnimationFrame((nextTimestamp) => this._loop(nextTimestamp));
    }
  }

  function boot() {
    injectStyles();
    const mount = ensureMountNode();
    const game = new RunnerGame(mount);
    window.runnerGame = game;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
