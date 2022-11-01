// food class
export default class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!;
  }

  // get X position
  get X() {
    return this.element.offsetLeft;
  }

  // get Y position
  get Y() {
    return this.element.offsetTop;
  }

  // set random position
  change() {
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = top + "px";
    this.element.style.top = left + "px";
  }
}
