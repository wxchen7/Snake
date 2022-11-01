export default class Snake {
  // snake container
  element: HTMLElement;

  // snake head element
  head: HTMLElement;

  // snake element
  body: HTMLCollection;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div")!;
    this.body = this.element!.getElementsByTagName("div")!;
  }

  // get head position
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // set snake position
  set X(value) {
    if (this.X === value) return;

    // boundary
    if (value < 0 || value > 290) {
      throw new Error("Game Over!");
    }
    // turn back check
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) value = this.X - 10;
      else value = this.X + 10;
    }
    // move body
    this.moveBody();

    this.head.style.left = value + "px";

    this.checkHeadBody();
  }

  set Y(value) {
    if (this.Y === value) return;

    // boundary
    if (value < 0 || value > 290) {
      throw new Error("Game Over!");
    }

    // turn back check
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) value = this.X - 10;
      else value = this.Y + 10;
    }

    // move body
    this.moveBody();

    this.head.style.top = value + "px";

    this.checkHeadBody();
  }

  // add snake body
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // body move
  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;

      (this.body[i] as HTMLElement).style.left = X + "px";
      (this.body[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // check head body
  checkHeadBody() {
    // get all the body
    for (let i = 1; i < this.body.length; i++) {
      let body = this.body[i] as HTMLElement;
      if (this.X === body.offsetLeft && this.Y === body.offsetTop)
        throw new Error("Game Over!");
    }
  }
}
