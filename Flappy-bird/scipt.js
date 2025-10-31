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
    x: 50,
    y: BOARD_HEIGHT / 2,
    width: 40,
    height: 30,
};

let gravity = 0.5;
let birdY = BOARD_HEIGHT / 2;
const PIPE_WIDTH = BOARD_WIDTH / 10;
const PIPE_GAP = BOARD_HEIGHT / 3;
let pipeArray = [];
let pipeIntervalId;

const create_pipe = () => {
    const MAX_PIPE_HEIGHT = BOARD_HEIGHT - PIPE_GAP;
    const TOP_PIPE_HEIGHT = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - 30));
    const BOTOOM_PIPE_HEIGHT = MAX_PIPE_HEIGHT - TOP_PIPE_HEIGHT;

    let topPipe = {
        x: BOARD_WIDTH,
        y: 0,
        width: PIPE_WIDTH,
        height: TOP_PIPE_HEIGHT,
        passed: false,
    };

    let bottomPipe = {
        x: BOARD_WIDTH,
        y: BOARD_HEIGHT - BOTOOM_PIPE_HEIGHT,
        width: PIPE_WIDTH,
        height: BOTOOM_PIPE_HEIGHT,
        passed: false,
    };
    pipeArray.push((topPipe, bottomPipe));
};

const handleKeyDown = () => {};
document.addEventListener("keydown", handleKeyDown);

let board;
window.onload = () => {
    console.log("start");
    board = document.getElementById("board");
    board.height = BOARD_HEIGHT;
    board.width = BOARD_WIDTH;
    let context = board.getContext("2d");

    // bottom image
    let base = new Image();
    base.src = "./assets/Images/base.png";
    base.onload = () => {
        // Ta funkcja jest wywoływana TYLKO, gdy plik obrazu jest gotowy.
        context.drawImage(base, 0, BOARD_HEIGHT - 120, BOARD_WIDTH, 120);
        console.log("Obraz bazy narysowany!");
    };
};
