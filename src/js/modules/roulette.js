export default class Roulette {
  constructor() {
    this.setParams();
    this.bind();
  }
  setParams() {
    this.startBtn = document.querySelector('.start');
    this.roulette = document.querySelector('.roulette');
    this.bindRotate = this.rotate.bind(this);
  }
  rotate(){
    const initDeg = window.getComputedStyle(this.roulette).transform;
    const finishDeg = 3600 + Math.floor(360 * Math.random());

    const animation = [
      {transform: 'rotate(' + initDeg + 'deg)'},
      {transform: 'rotate('+ finishDeg +'deg)'}
    ]

    const animationTiming = {
      duration: 3000,
      easing: "ease-in-out"
    }

    const rouletteAnimation = this.roulette.animate(
      animation,
      animationTiming
    )

    rouletteAnimation.addEventListener("finish", () => {
      this.roulette.style.transform = 'rotate('+ finishDeg % 360 +'deg)';
    })

  }
  bind(){
    this.startBtn.addEventListener("click", this.bindRotate);
  }
}