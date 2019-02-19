import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { MenuScene } from "./scenes/MenuScene";
import { GameScene } from "./scenes/GameScene";

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
  scene: [BootScene, MenuScene, GameScene]
};

document.addEventListener("DOMContentLoaded", () => {
  const game = new Phaser.Game(config);
});
