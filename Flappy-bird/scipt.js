// Iphone XR
const BOARD_WIDTH = 414;
const BOARD_HEIGHT = 806;
let backgroundImage = new Image();
backgroundImage.src = "./assets/Images/background-day.png";

const GAME_STATE = {
    MENU: "menu",
    PLAY: "play",
    GAME_OVER: "gameOver",
};

let bird = {
    x: BOARD_WIDTH / 8,
    y: BOARD_HEIGHT / 2,
    width: 40,
    height: 30,
};

let velocityY;
let velocityX = -4;
let gravity = 0.5;
let birdY = BOARD_HEIGHT / 2;
const PIPE_WIDTH = BOARD_WIDTH / 10;
const PIPE_GAP = BOARD_HEIGHT / 4;
let pipeArray = [];
let pipeIntervalId;
let currentState = GAME_STATE.PLAY;
const BASE_HEIGHT = 120;

const create_pipe = () => {
    const MIN_PIPE_HEIGHT = 30;
    const MAX_RANDOM_SPACE =
        BOARD_HEIGHT - BASE_HEIGHT - PIPE_GAP - 2 * MIN_PIPE_HEIGHT;
    const RANDOM_HEIGHT_ADDITION = Math.floor(Math.random() * MAX_RANDOM_SPACE);
    const TOP_PIPE_HEIGHT = MIN_PIPE_HEIGHT + RANDOM_HEIGHT_ADDITION;
    const BOTOOM_PIPE_HEIGHT =
        BOARD_HEIGHT - TOP_PIPE_HEIGHT - PIPE_GAP - BASE_HEIGHT;

    let topPipe = {
        x: BOARD_WIDTH,
        y: 0,
        width: PIPE_WIDTH,
        height: TOP_PIPE_HEIGHT,
        passed: false,
        isTop: true,
    };

    let bottomPipe = {
        x: BOARD_WIDTH,
        y: BOARD_HEIGHT - BOTOOM_PIPE_HEIGHT - BASE_HEIGHT,
        width: PIPE_WIDTH,
        height: BOTOOM_PIPE_HEIGHT,
        passed: false,
        isTop: false,
    };
    console.log(topPipe.height, bottomPipe.height);

    pipeArray.push(topPipe, bottomPipe);
};

const drawPipe = (index) => {
    let pipe = pipeArray[index];
    pipe.x += velocityX;
    const PIPE_HEAD_HEIGHT = 24;

    if (pipe.isTop) {
        context.drawImage(
            pipeImg,
            0,
            PIPE_HEAD_HEIGHT,
            pipeImg.width,
            pipeImg.height - PIPE_HEAD_HEIGHT,
            pipe.x,
            pipe.y,
            pipe.width,
            pipe.height - PIPE_HEAD_HEIGHT
        );

        context.drawImage(
            pipeImg,
            0,
            0,
            pipeImg.width,
            PIPE_HEAD_HEIGHT,
            pipe.x,
            pipe.y + pipe.height - PIPE_HEAD_HEIGHT,
            pipe.width,
            PIPE_HEAD_HEIGHT
        );
    } else {
        context.drawImage(
            pipeImg,
            0,
            0,
            pipeImg.width,
            PIPE_HEAD_HEIGHT,

            pipe.x,
            pipe.y,
            pipe.width,
            PIPE_HEAD_HEIGHT
        );

        context.drawImage(
            pipeImg,
            0,
            PIPE_HEAD_HEIGHT,
            pipeImg.width,
            pipeImg.height - PIPE_HEAD_HEIGHT,

            pipe.x,
            pipe.y + PIPE_HEAD_HEIGHT,
            pipe.width,
            pipe.height - PIPE_HEAD_HEIGHT
        );
    }
};

let base, birdImg, pipeImg, playButtonImg;
let score = 0;
let inputLocked = false;

const initializeImage = async () => {
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) => {
                console.error(`Błąd ładowania obrazu: ${src}`, e);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });
    };

    const imagePromises = [
        loadImage("./assets/Images/yellowbird-midflap.png"),
        loadImage("./assets/Images/pipe-green.png"),
        loadImage("./assets/Images/base.png"),
        loadImage("./assets/Images/background-day.png"),
    ];

    const [loadedBirdImg, loadedPipeImg, loadedBase, loadedBackground] =
        await Promise.all(imagePromises);

    birdImg = loadedBirdImg;
    pipeImg = loadedPipeImg;
    base = loadedBase;
    backgroundImage = loadedBackground;
    console.log("Wszystkie obrazy zostały załadowane!");
};

const clearBoard = () => {
    if (backgroundImage) {
        context.drawImage(backgroundImage, 0, 0, board.width, board.height);
    } else {
        context.clearRect(0, 0, board.width, board.height);
    }
    context.drawImage(
        base,
        0,
        BOARD_HEIGHT - BASE_HEIGHT,
        BOARD_WIDTH,
        BASE_HEIGHT
    );
};

function renderGame() {
    clearBoard();
    bird.y = velocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        drawPipe(i);
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -PIPE_WIDTH) {
        pipeArray.shift();
    }
}

function startGame() {
    currentState = GAME_STATE.PLAY;
    bird.y = 0;
    velocityY = BOARD_HEIGHT / 2 - BASE_HEIGHT / 2;
    pipeArray = [];
    score = 0;

    if (pipeIntervalId) {
        clearInterval(pipeIntervalId);
    }

    create_pipe();
    pipeIntervalId = setInterval(() => {
        create_pipe();
    }, 500);
}

const renderMenu = () => {
    clearBoard();
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.textAlign = "center";
    context.fillText("Naciśnij SPACJĘ!", BOARD_WIDTH / 2, BOARD_HEIGHT / 3);
};

const renderGameOver = () => {
    context.fillStyle = "red";
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("GAME OVER", BOARD_WIDTH / 2, BOARD_HEIGHT / 4);
};

const updateGameState = () => {
    if (currentState === GAME_STATE.MENU) {
        renderMenu();
    } else if (currentState === GAME_STATE.PLAY) {
        renderGame();
    } else if (currentState === GAME_STATE.GAME_OVER) {
        renderGame();
        renderGameOver();
        clearInterval(pipeIntervalId);
    }
    requestAnimationFrame(updateGameState);
};

const handleKeyDown = (e) => {
    if (e.code === "Space") {
        if (currentState === GAME_STATE.MENU) {
            startGame();
        } else if (currentState === GAME_STATE.GAME_OVER) {
            resetGame();
            currentState = GAME_STATE.MENU;
        } else if (currentState === GAME_STATE.PLAY) {
            console.log("space");
        }
    }
};
document.addEventListener("keydown", handleKeyDown);

let board, context;
window.onload = async () => {
    board = document.getElementById("board");
    if (!board) return;

    board.height = BOARD_HEIGHT;
    board.width = BOARD_WIDTH;
    context = board.getContext("2d");
    await initializeImage();
    currentState = GAME_STATE.MENU;
    requestAnimationFrame(updateGameState);
};
