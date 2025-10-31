// TODO: być moe base równie powinien się przemieszczać
// TODO: LocalStorage powinien przechowywać najlepsze wyniki
// TODO: przy kontakcie z przeszkodą powinna załączać się animacja
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
    GAME_OVER: "gameOver",
};

// --- game define ---
class FlappyGame {
    constructor(context, images, board) {
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
        this.currentState = GAME_STATE.MENU;
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

        // base animation
        this.baseX = 0;
        this.baseVelocity = this.velocityX;

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

        // base running animation
        this.baseX += this.baseVelocity;
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

    renderGame() {
        this.clearBoard();
        this.drawBird();

        // floor collide
        if (this.bird.y + this.bird.height > BOARD_HEIGHT - this.BASE_HEIGHT) {
            this.bird.y = BOARD_HEIGHT - this.BASE_HEIGHT - this.bird.height;
            this.currentState = GAME_STATE.GAME_OVER;
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
                this.currentState = GAME_STATE.GAME_OVER;
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
        this.context.fillStyle = "white";
        this.context.font = "48px Arial";
        this.context.textAlign = "right";
        this.context.fillText(Math.floor(this.score), BOARD_WIDTH - 20, 60);
    }

    renderMenu() {
        this.clearBoard();
        this.context.fillStyle = "black";
        this.context.font = "30px Arial";
        this.context.textAlign = "center";
        this.context.fillText(
            "Press Space!",
            BOARD_WIDTH / 2,
            BOARD_HEIGHT / 3
        );
    }

    renderGameOver() {
        this.context.fillStyle = "red";
        this.context.font = "50px Arial";
        this.context.textAlign = "center";
        this.context.fillText("GAME OVER", BOARD_WIDTH / 2, BOARD_HEIGHT / 4);
        this.context.fillStyle = "black";
        this.context.font = "20px Arial";
        this.context.fillText(
            "Space, back to Menu",
            BOARD_WIDTH / 2,
            BOARD_HEIGHT / 4 + 60
        );
    }

    startGame() {
        this.currentState = GAME_STATE.PLAY;
        this.bird.y = BOARD_HEIGHT / 2;
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

    // handle game status active
    updateGameState = () => {
        if (this.currentState === GAME_STATE.MENU) {
            this.renderMenu();
        } else if (this.currentState === GAME_STATE.PLAY) {
            this.renderGame();
        } else if (this.currentState === GAME_STATE.GAME_OVER) {
            // this.renderGame();
            this.renderGameOver();
            this.resetGame(); // stop pipes
        }
        requestAnimationFrame(this.updateGameState);
    };

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
    ];

    const [birdUp, birdMid, birdDown, pipeImg, base, backgroundImage] =
        await Promise.all(imagePromises);

    return { birdUp, birdMid, birdDown, pipeImg, base, backgroundImage };
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

    const game = new FlappyGame(context, loadedImages, board);
    console.log(loadedImages);

    // game loop init in constructor
};
