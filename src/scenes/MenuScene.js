import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene"
    });
  }

  init() {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create() {
    this.add.image(400, 300, "bg");
    this.add.text(
      this.sys.canvas.width / 2 - 130,
      this.sys.canvas.height / 2 - 50,
      "Muistipeli",
      {
        fontSize: "64px",
        fontFamily: "Arial",
        color: "#ef534f",
        align: "center"
      }
    );
  }

  update() {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
