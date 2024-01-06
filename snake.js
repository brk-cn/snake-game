class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  init() {
    this.score = 0;
    this.unit = 20;
    this.tiles = this.canvas.width / this.unit;
    this.food = {
      x: Math.floor(Math.random() * this.tiles),
      y: Math.floor(Math.random() * this.tiles),
    };
    this.snake = [
      { x: 3, y: 12 },
      { x: 2, y: 12 },
      { x: 1, y: 12 },
    ];
    this.direction = "RIGHT";
    this.hasEatenFood = false;
    this.timer = setInterval(this.loop.bind(this), 1000 / 15);
  }

  onKeyPress(e) {
    if (e.keyCode === 37 && this.direction !== "RIGHT") this.direction = "LEFT";
    else if (e.keyCode === 38 && this.direction !== "DOWN") this.direction = "UP";
    else if (e.keyCode === 39 && this.direction !== "LEFT") this.direction = "RIGHT";
    else if (e.keyCode === 40 && this.direction !== "UP") this.direction = "DOWN";
  }

  draw() {
    this.ctx.fillStyle = "#333333";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#555555";
    this.ctx.font = "64px monospace";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.score, this.canvas.width / 2, this.canvas.height / 2);

    this.snake.forEach((s, i) => {
      this.ctx.fillStyle = i === 0 ? "#48D1CC" : "#AFEEEE";
      this.ctx.fillRect(s.x * this.unit + 2, s.y * this.unit + 2, this.unit - 4, this.unit - 4);
    });

    this.ctx.fillStyle = "#DC143C";
    this.ctx.fillRect(this.food.x * this.unit, this.food.y * this.unit, this.unit, this.unit);
  }

  move() {
    let posX = this.snake[0].x;
    let posY = this.snake[0].y;

    this.hasEatenFood ? this.hasEatenFood = false : this.snake.pop();

    if (this.direction === "RIGHT") posX += 1;
    else if (this.direction === "DOWN") posY += 1;
    else if (this.direction === "LEFT") posX -= 1;
    else if (this.direction === "UP") posY -= 1;

    this.snake.unshift({ x: posX, y: posY });
  }

  collision() {
    let [head, ...tail] = this.snake;

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.hasEatenFood = true;
      this.food = {
        x: Math.floor(Math.random() * this.tiles),
        y: Math.floor(Math.random() * this.tiles),
      };
    }

    tail.forEach((s) => {
      if (head.x === s.x && head.y === s.y) {
        this.reset();
      }
    });

    if (head.x < 0 || head.x > 24 || head.y < 0 || head.y > 24) {
      this.reset();
    }
  }

  loop() {
    this.draw();
    this.move();
    this.collision();
  }

  reset() {
    clearInterval(this.timer);
    this.init();
  }
}

const game = new SnakeGame();
window.onload = () => game.init();