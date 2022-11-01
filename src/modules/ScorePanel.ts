// score class
export default class ScorePanel {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // max level
  maxLevel: number;

  // level up score
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // add score
  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // level up
  levelUp() {
    if (this.level < this.maxLevel) this.levelEle.innerHTML = ++this.level + "";
  }
}
