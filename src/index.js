import Phaser from "phaser";
import "../assets/styles.scss";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#5df4f0",
  scale: {
    parent: "container",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL("/");

  this.load.image("card", "assets/Card.png");
  this.load.image("CardA", "assets/CardA.png");
  this.load.image("CardB", "assets/CardB.png");
  this.load.image("CardC", "assets/CardC.png");
  this.load.image("CardD", "assets/CardD.png");
  this.load.image("CardE", "assets/CardE.png");
  this.load.image("CardF", "assets/CardF.png");
  this.load.image("CardG", "assets/CardG.png");
  this.load.image("CardH", "assets/CardH.png");
  this.load.image("bg", "assets/bg.png");
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function create() {
  this.add.image(400, 300, "bg");

  let curX = 200;
  let curY = 300;

  const faces = shuffle([
    "CardA",
    "CardA",
    "CardB",
    "CardB",
    "CardC",
    "CardC",
    "CardD",
    "CardD",
    "CardE",
    "CardE",
    "CardF",
    "CardF",
    "CardG",
    "CardG",
    "CardH",
    "CardH"
  ]);

  const cardBacks = [];
  const cardFaces = [];
  let i = 0;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      cardBacks.push(
        this.add
          .image(x * 150 + 175, y * 150 + 75, "card")
          .setData("index", i)
          .setData("isFace", false)
          .setScale(0.3)
          .setInteractive()
      );
      cardFaces.push(
        this.add
          .image(x * 150 + 175, y * 150 + 75, faces[i])
          .setData("index", i)
          .setData("isFace", true)
          .setScale(0.3)
          .setInteractive()
          .setVisible(false)
      );
      i++;
    }
  }

  this.input.on(
    "gameobjectdown",
    function(pointer, gameObject) {
      if (gameObject.getData("isFace")) {
        cardFaces[gameObject.getData("index")].setVisible(false);
        cardBacks[gameObject.getData("index")].setVisible(true);
      } else {
        cardFaces[gameObject.getData("index")].setVisible(true);
        cardBacks[gameObject.getData("index")].setVisible(false);
      }
      //  Will contain the top-most Game Object (in the display list)
      // this.tweens.add({
      //   targets: gameObject,
      //   // x: { value: 1100, duration: 1500, ease: "Power2" },
      //   y: { value: 500, duration: 500, ease: "Bounce.easeOut", delay: 150 }
      // });
    },
    this
  );
}
