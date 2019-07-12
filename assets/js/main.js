var game;

// game = new Phaser.Game(1000, 600, Phaser.AUTO, '');
game = new Phaser.Game(968, 681, Phaser.AUTO, '');
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.start('Menu');