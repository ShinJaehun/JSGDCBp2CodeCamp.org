import "./styles.css";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;
//let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "../assets/img/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "../assets/img/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "../assets/img/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "../assets/img/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "../assets/img/layer-5.png";

const slider = document.getElementById("slider");
slider.value = gameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener("change", function (e) {
  //console.log(e.target.value);
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
});

//let x = 0;
//let x2 = 2400;

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    //this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;

    /*
    // 가장 간단한 버전인데 스크롤 할 때 약간 부자연스러움?
    this.x = (gameFrame * this.speed) % this.width;
    */

    /*
    // 가장 복잡한 버전
    if (this.x <= -this.width) {
      this.x = this.width - this.speed;
    }
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
    */

    //이게 가장 나은 버전인거야?
    if (this.x <= -this.width) {
      //this.x = this.width - this.speed;
      this.x = 0;
    }
    this.x = this.x - this.speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //ctx.drawImage(backgroundLayer4, x, 0);
  //ctx.drawImage(backgroundLayer4, x2, 0);

  //if (x < -2400) x = 2400;
  //x -= gameSpeed;

  // 두 배경 이미지를 이어 붙이다보니 중간에 틈이 생기는데...
  // 이걸 해결하는 방법을 설명해주시는데(x와 x2를 중간에 한번씩 더하는 과정)
  // 솔직히 잘 이해가 안 됩니다.ㅠㅠ

  //if (x < -2400) x = 2400 + x2 - gameSpeed;
  //else x -= gameSpeed;
  //if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  //else x2 -= gameSpeed;

  //layer4.update();
  //layer4.draw();

  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });

  //gameFrame--;
  requestAnimationFrame(animate);
}

animate();
