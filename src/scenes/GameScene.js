import Phaser from "phaser";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  init() {
    this.openCards = [];
    this.openCardValues = [];
    this.timeTurnMade = 0;
  }

  create() {
    this.add.image(400, 300, "bg");

    let curX = 200;
    let curY = 300;

    const faces = shuffle([
      "cardA",
      "cardA",
      "cardB",
      "cardB",
      "cardC",
      "cardC",
      "cardD",
      "cardD",
      "cardE",
      "cardE",
      "cardF",
      "cardF",
      "cardG",
      "cardG",
      "cardH",
      "cardH"
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
          this.openCardValues.length < 2 && !gameObject.getData("isFace");

        if (isAllowedMove) {
          const face = cardFaces[gameObject.getData("index")];
          const back = cardBacks[gameObject.getData("index")];
          face.setVisible(true);
          back.setVisible(false);
          this.openCards.push(face);
          this.openCards.push(back);
          this.openCardValues.push(face.getData("value"));
        }
      },
      this
    );
  }

  // let this.timeTurnMade = 0;
  update(time, delta) {
    if (this.openCardValues.length === 2 && this.timeTurnMade === 0) {
      this.timeTurnMade = time;
    }

    if (this.openCardValues.length === 2 && time - this.timeTurnMade > 2000) {
      if (this.openCardValues[0] === this.openCardValues[1]) {
        this.openCards.forEach(card => {
          card.setVisible(false);
        });
      } else {
        this.openCards.forEach(card => {
          card.setVisible(!card.visible);
        });
      }
      this.openCards = [];
      this.openCardValues = [];
      this.timeTurnMade = 0;
    }
  }
}
