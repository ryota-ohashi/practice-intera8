export default class Roulette {
  constructor() {
    this.setParams();
    this.bind();
  }
  setParams() {
    this.startBtn = document.querySelector('.js-startBtn');
    this.roulette = document.querySelector('.js-roulette');
    this.error = document.querySelector('.js-error');
    this.input = document.querySelectorAll('.js-input');
    this.result = document.querySelector('.js-result');
    this.winner = document.querySelector('.js-winner');
    this.StartFlag = false;
    this.inputedCount = 0;
    this.colorList = ["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF"];
    this.bindRotate = this.rotate.bind(this);
    this.bindJudgeInput = this.judgeInput.bind(this);
  }
  rotate(){
    // スタートできるか確認
    this.judgeStartFlag();
    if(this.StartFlag) {
      this.error.textContent = ""
    }else{
      this.error.textContent = "2項目以上設定して下さい。"
      return;
    }

    // 角度の初期値を取得
    const initDeg = window.getComputedStyle(this.roulette).transform;
    // ランダムに回す角度を決定
    const finishDeg = 3600 + Math.floor(360 * Math.random());

    // アニメーション定義
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

    // アニメーション完了後処理
    rouletteAnimation.addEventListener("finish", () => {
      // 0~360の範囲に戻してセット
      const deg = finishDeg % 360;
      this.roulette.style.transform = 'rotate('+ deg +'deg)';

      // 勝者の決定
      const winnerColor = this.judgeWinner(deg);
      const winner = document.querySelector('[data-color="' + winnerColor +'"]');

      // 勝者の色からテキストを抽出
      const winnerText = winner.nextElementSibling.value;
      this.winner.textContent = winnerText + "が選ばれました！！";

      // 勝者の表示
      this.result.classList.add("show");
      setTimeout(() => {
        this.result.classList.remove("show");
      }, 3000);
    })
  }
  judgeWinner(correctDeg){
    const deg = 360 - correctDeg;
    const perDeg = 360 / this.inputedCount;
    for (let i = 0; i < this.inputedCount; i++) {
      if(deg > perDeg * i && deg <= perDeg * (i + 1)) return this.colorList[i];
    }
  }
  judgeInput(){
    // 文字が入っている列に色を付与
    let count = 0;
    this.input.forEach((el) => {
      if (el.value !== "") {
        this.setLabelColor(el, count);
        count++;
      }else{
        this.removeLabelColor(el);
      }
    })

    // ルーレット側に色を反映
    this.setRoulette(count);
  }
  judgeStartFlag(){
    // ２つ以上値が入っているか判定
    this.inputedCount = 0;
    this.input.forEach((el) => {
      if (el.value !== "") this.inputedCount++;
    })
    if (this.inputedCount > 1) {
      this.StartFlag = true;
    }else{
      this.StartFlag = false;
    }
  }
  setLabelColor(el, count){
    el.parentElement.querySelector('span').setAttribute("data-color", this.colorList[count]);
    el.parentElement.querySelector('span').style.backgroundColor = this.colorList[count];
  }
  removeLabelColor(el){
    el.parentElement.querySelector('span').removeAttribute("data-color");
    el.parentElement.querySelector('span').style.backgroundColor = "#fff";
  }
  setRoulette(count){
    // 入力数からgradientを作成し、付与する
    const perColor = 360 / count;

    let gradient = "conic-gradient("
    if (count > 0) gradient += this.colorList[0] + " 0deg " + perColor + "deg"
    if (count > 1) gradient += "," + this.colorList[1] + " " + perColor + "deg " + perColor * 2 + "deg"
    if (count > 2) gradient += "," + this.colorList[2] + " " + perColor * 2 + "deg " + perColor * 3 + "deg"
    if (count > 3) gradient += "," + this.colorList[3] + " " + perColor * 3 + "deg " + perColor * 4 + "deg"
    if (count > 4) gradient += "," + this.colorList[4] + " " + perColor * 4 + "deg " + perColor * 5 + "deg"
    if (count > 5) gradient += "," + this.colorList[5] + " " + perColor * 5 + "deg " + perColor * 6 + "deg"
    gradient += ")"

    this.roulette.style.background = gradient;
  }
  bind(){
    this.input.forEach(el => {
      el.addEventListener("input", this.bindJudgeInput);
    })
    this.startBtn.addEventListener("click", this.bindRotate);
  }
}