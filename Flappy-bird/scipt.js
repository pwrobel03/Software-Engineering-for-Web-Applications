// TODO: pobicie rekordu skutkuje pojawieniem się animacji przed ekranem podsumowującym

// FIXME: Przeszkoda są tworzone przy uzyciu assetów losowa przerwa miedzy elementami
// FIXME: obsługa dźwięków i muzyki

// dimensions configuration
const BOARD_WIDTH = 414;
const BOARD_HEIGHT = 806;

// game status
const GAME_STATE = {
    MENU: "menu",
    PLAY: "play",
    CRASHING: "crashing",
    NEW_RECORD: "newRecord",
    CONGRATULATIONS: "congratulations",
    GAME_OVER: "gameOver",
};

// score display
const loadScoreDigits = async () => {
    const digitImages = {};
    const promises = [];

    for (let i = 0; i <= 9; i++) {
        const src = `./assets/UI/Numbers/${i}.png`;

        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                digitImages[i] = img;
                resolve();
            };
            img.onerror = (e) =>
                reject(new Error(`Failed to load digit: ${src}`));
            img.src = src;
        });
        promises.push(promise);
    }

    await Promise.all(promises);
    return digitImages;
};

// --- game define ---
class FlappyGame {
    constructor(context, images, board, scoreDigits) {
        // canvas
        this.context = context;
        this.board = board;

        // Loaded images
        this.base = images.base;
        this.birdFrames = [
            images.birdMid,
            images.birdUp,
            images.birdMid,
            images.birdDown,
        ];
        this.pipeImg = images.pipeImg;
        this.backgroundImage = images.backgroundImage;
        this.titleScreenImg = images.titleScreenImg;
        this.gameOverImg = images.gameOverImg;
        this.rotation = 0;

        // logical bird image changes
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.FRAME_SPEED = 5;

        // constance game rule
        this.PIPE_WIDTH = BOARD_WIDTH / 7;
        this.PIPE_GAP = BOARD_HEIGHT / 4;
        this.BASE_HEIGHT = 120; // bird fall
        this.gravity = 0.4; //
        this.velocityX = -2; // speed of pipes
        this.jump = 8;

        // Game status
        this.currentState = GAME_STATE.CONGRATULATIONS;
        this.score = 0;
        this.pipeArray = [];
        this.pipeIntervalId = null;

        // bird status
        this.bird = {
            x: BOARD_WIDTH / 8,
            y: BOARD_HEIGHT / 2,
            width: 40,
            height: 30,
        };
        this.velocityY = 0;

        // flash effect on collision
        this.isFlashing = false;
        this.flashDuration = 15;
        this.flashCounter = 0;
        this.flashColor = "rgba(255, 255, 255, 0.5)";

        // base animation
        this.baseX = 0;
        this.baseVelocity = this.velocityX;

        // scores settings
        this.MAX_HIGH_SCORES = 5;
        this.STORAGE_KEY = "flappyHighScores";
        this.highScores = this.loadHighScores();
        this.isNewRecord = false;
        this.scoreSaved = false;
        this.recordTimerActive = false;
        this.velocityXRec = 0;
        this.highestScoreAnimationEnd = false;

        // score display
        this.scoreDigits = scoreDigits;
        this.DIGIT_WIDTH = 36;
        this.DIGIT_HEIGHT = 48;

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        // game loop
        this.updateGameState();
    }

    clearBoard() {
        // background
        if (this.backgroundImage) {
            this.context.drawImage(
                this.backgroundImage,
                0,
                0,
                this.board.width,
                this.board.height
            );
        } else {
            this.context.clearRect(0, 0, this.board.width, this.board.height);
        }

        // base running animation, only on specify mode
        if (
            this.currentState === GAME_STATE.MENU ||
            this.currentState === GAME_STATE.PLAY ||
            this.currentState == GAME_STATE.NEW_RECORD
        ) {
            this.baseX += this.baseVelocity;
        }
        if (this.baseX <= -BOARD_WIDTH) {
            this.baseX = 0;
        }

        // draw base
        this.context.drawImage(
            this.base,
            this.baseX,
            BOARD_HEIGHT - this.BASE_HEIGHT,
            BOARD_WIDTH,
            this.BASE_HEIGHT
        );

        this.context.drawImage(
            this.base,
            this.baseX + BOARD_WIDTH,
            BOARD_HEIGHT - this.BASE_HEIGHT,
            BOARD_WIDTH,
            this.BASE_HEIGHT
        );
    }

    // --- pipe instance ---
    createPipe() {
        const MIN_PIPE_HEIGHT = 80;
        const MAX_RANDOM_SPACE =
            BOARD_HEIGHT -
            this.BASE_HEIGHT -
            this.PIPE_GAP -
            2 * MIN_PIPE_HEIGHT;
        const RANDOM_HEIGHT_ADDITION = Math.floor(
            Math.random() * Math.max(0, MAX_RANDOM_SPACE)
        );
        const TOP_PIPE_HEIGHT = MIN_PIPE_HEIGHT + RANDOM_HEIGHT_ADDITION;
        const BOTOOM_PIPE_HEIGHT =
            BOARD_HEIGHT - TOP_PIPE_HEIGHT - this.PIPE_GAP - this.BASE_HEIGHT;
        if (
            TOP_PIPE_HEIGHT < MIN_PIPE_HEIGHT ||
            BOTOOM_PIPE_HEIGHT < MIN_PIPE_HEIGHT
        ) {
            console.log(TOP_PIPE_HEIGHT, BOTOOM_PIPE_HEIGHT);
        }

        const topPipe = {
            x: BOARD_WIDTH,
            y: 0,
            width: this.PIPE_WIDTH,
            height: TOP_PIPE_HEIGHT,
            passed: false,
            img: this.pipeImg,
            isTop: true,
        };

        const bottomPipe = {
            x: BOARD_WIDTH,
            y: BOARD_HEIGHT - BOTOOM_PIPE_HEIGHT - this.BASE_HEIGHT,
            width: this.PIPE_WIDTH,
            height: BOTOOM_PIPE_HEIGHT,
            passed: false,
            img: this.pipeImg,
            isTop: false,
        };
        this.pipeArray.push(topPipe, bottomPipe);
    }

    // --- handle pipe collision ---
    detectCollision(bird, pipe) {
        return (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + pipe.height &&
            bird.y + bird.height > pipe.y
        );
    }

    drawPipe(pipe) {
        const PIPE_HEAD_HEIGHT = 23;

        if (pipe.isTop) {
            this.context.drawImage(
                pipe.img,
                0,
                PIPE_HEAD_HEIGHT,
                pipe.img.width,
                pipe.img.height - PIPE_HEAD_HEIGHT,
                pipe.x,
                pipe.y,
                pipe.width,
                pipe.height - PIPE_HEAD_HEIGHT
            );

            this.context.drawImage(
                pipe.img,
                0,
                0,
                pipe.img.width,
                PIPE_HEAD_HEIGHT,
                pipe.x,
                pipe.y + pipe.height - PIPE_HEAD_HEIGHT,
                pipe.width,
                PIPE_HEAD_HEIGHT
            );
        } else {
            // Rura Dolna (normalna)
            this.context.drawImage(
                pipe.img,
                0,
                0,
                pipe.img.width,
                PIPE_HEAD_HEIGHT,
                pipe.x,
                pipe.y,
                pipe.width,
                PIPE_HEAD_HEIGHT
            );

            this.context.drawImage(
                pipe.img,
                0,
                PIPE_HEAD_HEIGHT,
                pipe.img.width,
                pipe.img.height - PIPE_HEAD_HEIGHT,
                pipe.x,
                pipe.y + PIPE_HEAD_HEIGHT,
                pipe.width,
                pipe.height - PIPE_HEAD_HEIGHT
            );
        }
    }

    drawBirdRotation() {
        this.frameCounter++;
        if (this.frameCounter >= this.FRAME_SPEED) {
            this.frameIndex = (this.frameIndex + 1) % this.birdFrames.length;
            this.frameCounter = 0;
        }

        const centerX = this.bird.x + this.bird.width / 2;
        const centerY = this.bird.y + this.bird.height / 2;
        this.context.save();
        this.context.translate(centerX, centerY);
        this.context.rotate(this.rotation);
        this.context.drawImage(
            this.birdFrames[this.frameIndex],
            -this.bird.width / 2,
            -this.bird.height / 2,
            this.bird.width,
            this.bird.height
        );
        this.context.restore();
    }

    drawBird() {
        // bird position
        this.velocityY += this.gravity;
        this.bird.y = Math.max(this.bird.y + this.velocityY, 0);

        // bird rotation
        if (this.velocityY > 0) {
            this.rotation = Math.min(this.rotation + 0.05, Math.PI / 2);
        } else if (this.velocityY < 0 && this.rotation < 0) {
            this.rotation = -Math.PI / 4;
        }

        // bird animation
        this.frameCounter++;
        if (this.frameCounter >= this.FRAME_SPEED) {
            // Zwiększ indeks klatki, zawijając do początku tablicy
            this.frameIndex = (this.frameIndex + 1) % this.birdFrames.length;
            this.frameCounter = 0;
        }

        // draw bird
        const centerX = this.bird.x + this.bird.width / 2;
        const centerY = this.bird.y + this.bird.height / 2;
        this.context.save();
        this.context.translate(centerX, centerY);
        this.context.rotate(this.rotation);
        this.context.drawImage(
            this.birdFrames[this.frameIndex],
            -this.bird.width / 2,
            -this.bird.height / 2,
            this.bird.width,
            this.bird.height
        );
        this.context.restore();
    }

    drawScore() {
        if (!this.scoreDigits) {
            this.context.fillStyle = "white";
            this.context.font = "48px Arial";
            this.context.textAlign = "right";
            this.context.fillText(Math.floor(this.score), BOARD_WIDTH - 20, 60);
            return;
        }

        const scoreString = Math.floor(this.score).toString();
        const totalWidth = scoreString.length * (this.DIGIT_WIDTH + 2);
        let drawX = BOARD_WIDTH - totalWidth - 20;
        for (let i = 0; i < scoreString.length; i++) {
            const digitChar = scoreString[i];
            const digit = parseInt(digitChar);
            const digitImage = this.scoreDigits[digit];
            if (digitImage) {
                this.context.drawImage(
                    digitImage,
                    drawX,
                    20, // y margin
                    this.DIGIT_WIDTH,
                    this.DIGIT_HEIGHT
                );
            }

            drawX += this.DIGIT_WIDTH + 2;
        }
    }

    renderGame() {
        this.clearBoard();
        this.drawBird();

        // floor collide
        if (this.bird.y + this.bird.height > BOARD_HEIGHT - this.BASE_HEIGHT) {
            this.bird.y = BOARD_HEIGHT - this.BASE_HEIGHT - this.bird.height;
            this.currentState = GAME_STATE.CRASHING;
        }

        // draw pipes
        for (let index = 0; index < this.pipeArray.length; index++) {
            let pipe = this.pipeArray[index];
            pipe.x += this.velocityX;
            this.drawPipe(pipe);
            // score
            if (!pipe.passed && this.bird.x > pipe.x + pipe.width) {
                this.score += 0.5;
                pipe.passed = true;
            }

            // pipe collide
            if (this.detectCollision(this.bird, pipe)) {
                if (this.currentState === GAME_STATE.PLAY) {
                    this.currentState = GAME_STATE.CRASHING;
                    this.resetGame(); // TODO: moze na wyrost
                    this.isFlashing = true;
                    this.flashCounter = this.flashDuration;
                }
            }
        }

        // remove pipes offscreen
        while (
            this.pipeArray.length > 0 &&
            this.pipeArray[0].x < -this.PIPE_WIDTH
        ) {
            this.pipeArray.shift();
        }

        // draw score
        this.drawScore();
    }

    renderMenu() {
        this.clearBoard();

        if (this.titleScreenImg) {
            const imgWidth = BOARD_WIDTH - 100;
            const imgHeight = BOARD_HEIGHT / 2;

            const drawX = BOARD_WIDTH / 2 - imgWidth / 2;
            const drawY = (BOARD_HEIGHT - this.BASE_HEIGHT) / 4;

            this.context.drawImage(
                this.titleScreenImg,
                drawX,
                drawY,
                imgWidth,
                imgHeight
            );
        } else {
            this.context.fillStyle = "white";
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            this.context.fillText(
                "Press Space!",
                BOARD_WIDTH / 2,
                BOARD_HEIGHT / 3
            );
        }
    }

    renderGameOver() {
        const originalWidth = this.gameOverImg.width;
        const originalHeight = this.gameOverImg.height;
        const targetWidth = BOARD_WIDTH * 0.85;
        const targetHeight = (originalHeight / originalWidth) * targetWidth;
        const drawX = (BOARD_WIDTH - targetWidth) / 2;
        const drawY = BOARD_HEIGHT / 5;
        this.context.drawImage(
            this.gameOverImg,
            drawX,
            drawY,
            targetWidth,
            targetHeight
        );

        // show High Scores
        this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.textAlign = "center";

        let yOffset = BOARD_HEIGHT / 4 + 100;

        this.context.fillText(
            "--- NAJLEPSZE WYNIKI ---",
            BOARD_WIDTH / 2,
            yOffset - 20
        );
        yOffset += 25;

        if (this.highScores.length === 0) {
            this.context.fillText("Brak wyników", BOARD_WIDTH / 2, yOffset);
        } else {
            this.highScores.forEach((entry, index) => {
                const text = `${index + 1}. ${entry.score} pkt (${entry.date})`;
                this.context.fillText(
                    text,
                    BOARD_WIDTH / 2,
                    yOffset + index * 40
                );
            });
        }
    }

    drawHighestScore() {
        if (!this.scoreDigits) {
            this.context.fillStyle = "white";
            this.context.font = "48px Arial";
            this.context.textAlign = "right";
            this.context.fillText(
                Math.floor(this.score),
                BOARD_WIDTH - 20,
                BOARD_HEIGHT / 3 + 60
            );
            return;
        }

        const scoreString = Math.floor(this.score).toString();
        const totalWidth = scoreString.length * (this.DIGIT_WIDTH + 2);
        let drawX = (BOARD_WIDTH - totalWidth) / 2;
        for (let i = 0; i < scoreString.length; i++) {
            const digitChar = scoreString[i];
            const digit = parseInt(digitChar);
            const digitImage = this.scoreDigits[digit];
            if (digitImage) {
                this.context.drawImage(
                    digitImage,
                    drawX,
                    BOARD_HEIGHT / 3 + 60, // y margin
                    this.DIGIT_WIDTH,
                    this.DIGIT_HEIGHT
                );
            }

            drawX += this.DIGIT_WIDTH + 2;
        }
    }

    renderCongratulations() {
        console.log("Congrat");
        this.drawHighestScore();

        // highest score
        this.context.fillStyle = "white";
        this.context.font = "52px bold Flappy Bird Regular";
        this.context.textAlign = "center";
        this.context.fillText(
            "THE RECORD",
            BOARD_WIDTH / 2,
            BOARD_HEIGHT / 3 + 30
        );

        this.context.fillStyle = "white";
        this.context.font = "44px bold Flappy Bird Regular";
        this.context.textAlign = "center";
        this.context.fillText(
            "YOU BREAK",
            BOARD_WIDTH / 2,
            BOARD_HEIGHT / 3 - 30
        );

        // show High Scores
        this.context.fillStyle = "white";
        this.context.font = "32px bold Flappy Bird Regular";
        this.context.textAlign = "center";
        this.context.fillText(
            "HIT SPACE TO PLAY",
            BOARD_WIDTH / 2,
            BOARD_HEIGHT - BOARD_HEIGHT / 2 + 30
        );
    }

    startGame() {
        this.scoreSaved = false;
        this.isNewRecord = false;
        this.recordTimerActive = false;
        this.currentState = GAME_STATE.PLAY;
        this.bird.y = BOARD_HEIGHT / 2;
        this.bird.x = BOARD_WIDTH / 8;
        this.velocityY = 0;
        this.score = 0;
        this.pipeArray = [];
        this.rotation = 0;

        if (this.pipeIntervalId) {
            clearInterval(this.pipeIntervalId);
        }

        this.createPipe();
        this.pipeIntervalId = setInterval(() => {
            this.createPipe();
        }, 2100);
    }

    resetGame() {
        clearInterval(this.pipeIntervalId);
        this.pipeIntervalId = null;
    }

    renderGameCrash() {
        this.clearBoard();

        // draw pipe
        for (let index = 0; index < this.pipeArray.length; index++) {
            this.drawPipe(this.pipeArray[index]);
        }

        const floorLimit = BOARD_HEIGHT - this.BASE_HEIGHT - this.bird.height;
        let isFloorHit = false;

        if (!this.isFlashing) {
            // bird position
            this.velocityY += this.gravity;
            const newY = this.bird.y + this.velocityY;

            if (newY >= floorLimit) {
                this.bird.y = floorLimit;
                this.velocityY = 0;
                isFloorHit = true; // flag floor hit
            } else {
                this.bird.y = Math.min(newY, floorLimit);
            }

            this.rotation = Math.min(this.rotation + 0.15, Math.PI / 2);
        }
        this.drawBird();

        // draw score
        this.drawScore();
        this.drawFlashEffect();

        if (isFloorHit) {
            if (!this.scoreSaved) {
                this.saveScore(this.score);
                this.scoreSaved = true;
            }

            if (this.currentState === GAME_STATE.CRASHING) {
                this.isNewRecord = true;
                if (this.isNewRecord) {
                    if (!this.recordTimerActive) {
                        setTimeout(() => {
                            this.currentState = GAME_STATE.NEW_RECORD;
                        }, 1000);
                        this.recordTimerActive = true;
                    }
                } else {
                    this.currentState = GAME_STATE.GAME_OVER;
                }
            }
        }
    }

    drawFlashEffect() {
        if (this.isFlashing && this.flashCounter > 0) {
            this.context.save();
            this.context.fillStyle = this.flashColor;
            this.context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
            this.context.restore();
            this.flashCounter--;
            if (this.flashCounter <= 0) {
                this.isFlashing = false;
            }
        }
    }

    renderNewRecord() {
        this.clearBoard();

        // draw pipes and score
        for (let index = 0; index < this.pipeArray.length; index++) {
            this.drawPipe(this.pipeArray[index]);
        }
        this.drawScore();

        const targetY = (BOARD_HEIGHT - this.BASE_HEIGHT) / 2;
        const targetX = BOARD_WIDTH / 2 - BOARD_WIDTH / 16;

        const distanceToTargetY = targetY - this.bird.y;
        this.velocityY += distanceToTargetY * 0.15;
        this.velocityY *= 0.1; // speed control
        this.bird.y += this.velocityY;

        const distanceToTargetX = targetX - this.bird.x;
        if (!this.velocityXRec) {
            this.velocityXRec = 0;
        }

        this.velocityXRec += distanceToTargetX * 0.1;
        this.velocityXRec *= 0.1;
        this.bird.x += this.velocityXRec;

        const isStabilized =
            Math.abs(this.velocityY) < 0.1 && Math.abs(this.velocityXRec) < 0.1;

        if (!isStabilized) {
            const targetRotation = -Math.PI / 4;
            let rotationDiff = targetRotation - this.rotation;
            if (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
            if (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;
            this.rotation += rotationDiff * 0.1; // rotation speed
        } else {
            this.velocityY = 0;
            this.velocityXRec = 0;
            this.rotation = (this.rotation + 0.2) % (2 * Math.PI);
            if (!this.highestScoreAnimationEnd) {
                this.highestScoreAnimationEnd = true;
                setTimeout(() => {
                    this.currentState = GAME_STATE.CONGRATULATIONS;
                    this.recordTimerActive = false;
                    this.highestScoreAnimationEnd = false;
                    this.clearBoard();
                }, 3000);
            }
        }
        this.drawBirdRotation();
    }

    // handle game status active
    updateGameState = () => {
        if (this.currentState === GAME_STATE.MENU) {
            this.renderMenu();
        } else if (this.currentState === GAME_STATE.PLAY) {
            this.renderGame();
        } else if (this.currentState === GAME_STATE.CRASHING) {
            this.renderGameCrash();
        } else if (this.currentState === GAME_STATE.NEW_RECORD) {
            this.renderNewRecord();
        } else if (this.currentState === GAME_STATE.CONGRATULATIONS) {
            this.renderCongratulations();
        } else if (this.currentState === GAME_STATE.GAME_OVER) {
            this.renderGameOver();
        }
        requestAnimationFrame(this.updateGameState);
    };

    saveScore(newScore) {
        if (this.scoreSaved) return false;
        this.scoreSaved = true;
        const scoreEntry = {
            score: Math.floor(newScore),
            date: new Date().toLocaleDateString("pl-PL"),
        };

        // check best result
        const currentBestScore =
            this.highScores.length > 0 ? this.highScores[0].score : 0;

        this.highScores.push(scoreEntry);
        this.highScores.sort((a, b) => b.score - a.score);

        if (this.highScores.length > this.MAX_HIGH_SCORES) {
            this.highScores.length = this.MAX_HIGH_SCORES;
        }

        // set flag for best score
        this.isNewRecord = scoreEntry.score > currentBestScore;

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.highScores));
    }

    loadHighScores() {
        const json = localStorage.getItem(this.STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    }

    // --- key detect ---
    handleKeyDown(e) {
        if (e.code === "Space") {
            if (this.currentState === GAME_STATE.MENU) {
                this.startGame();
            } else if (this.currentState === GAME_STATE.GAME_OVER) {
                this.currentState = GAME_STATE.MENU;
            } else if (this.currentState === GAME_STATE.PLAY) {
                this.velocityY = -this.jump;
                this.rotation = -Math.PI / 4;
            }
        }
    }
}

// get resources
const initializeImage = async () => {
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) =>
                reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    };

    const imagePromises = [
        loadImage("./assets/Images/yellowbird-upflap.png"),
        loadImage("./assets/Images/yellowbird-midflap.png"),
        loadImage("./assets/Images/yellowbird-downflap.png"),
        loadImage("./assets/Images/pipe-green.png"),
        loadImage("./assets/Images/base.png"),
        loadImage("./assets/Images/background-day.png"),
        loadImage("./assets/UI/message.png"),
        loadImage("./assets/UI/gameover.png"),
    ];

    const [
        birdUp,
        birdMid,
        birdDown,
        pipeImg,
        base,
        backgroundImage,
        titleScreenImg,
        gameOverImg,
    ] = await Promise.all(imagePromises);

    return {
        birdUp,
        birdMid,
        birdDown,
        pipeImg,
        base,
        backgroundImage,
        titleScreenImg,
        gameOverImg,
    };
};

// --- run ---
window.onload = async () => {
    const board = document.getElementById("board");
    if (!board) {
        console.error("Błąd: Element canvas with ID 'board' not found!");
        return;
    }

    board.height = BOARD_HEIGHT;
    board.width = BOARD_WIDTH;
    const context = board.getContext("2d");

    // resources initialization
    const loadedImages = await initializeImage();
    const scoreDigits = await loadScoreDigits();

    const game = new FlappyGame(context, loadedImages, board, scoreDigits);
};
