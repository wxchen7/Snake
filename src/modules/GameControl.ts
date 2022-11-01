// import other classes
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

// Game Control Class, controls other classes
export default class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // key direction
  direction: string = "Right";

  // game running
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);

    this.init();
    this.move();
  }

  // init game
  init() {
    // bind event listener
    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  keydownHandler(e: KeyboardEvent) {
    this.direction = e.key;

    // ArrowUp          ie: up
    // ArrowDown           down
    // ArrowLeft            left
    // ArrowRight           right
  }

  // key control snake to move
  move() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    // check if is direction key
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    this.checkEat(X, Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      this.isLive = false;
      alert(e.message);
    }

    // set timer
    this.isLive &&
      setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // check if snake gets food
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}
