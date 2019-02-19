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
    create: create,
    update: update
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

let openCards = [];
let openCardValues = [];

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
          .setData("value", faces[i])
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
      const isAllowedMove =
        openCardValues.length < 2 && !gameObject.getData("isFace");

      if (isAllowedMove) {
        const face = cardFaces[gameObject.getData("index")];
        const back = cardBacks[gameObject.getData("index")];
        face.setVisible(true);
        back.setVisible(false);
        openCards.push(face);
        openCards.push(back);
        openCardValues.push(face.getData("value"));
      }
    },
    this
  );
}

let timeTurnMade = 0;
function update(time, delta) {
  if (openCardValues.length === 2 && timeTurnMade === 0) {
    timeTurnMade = time;
  }

  if (openCardValues.length === 2 && time - timeTurnMade > 2000) {
    if (openCardValues[0] === openCardValues[1]) {
      openCards.forEach(card => {
        card.setVisible(false);
      });
    } else {
      openCards.forEach(card => {
        card.setVisible(!card.visible);
      });
    }
    openCards = [];
    openCardValues = [];
    timeTurnMade = 0;
  }
}
