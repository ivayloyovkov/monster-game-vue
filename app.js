new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    newGameTitle: "START NEW GAME",
    playerStatus: "good",
    systemMessage: "",
    isPlayerDead: false,
    activityLog: []
  },
  methods: {
    startNewGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.newGameTitle = "RESTART GAME";
      this.playerStatus = "good";
      this.systemMessage = "";
      this.activityLog = [];
      this.activityLog.unshift({
        text: "Game started. Good Luck!"
      });
    },
    monsterAttack: function() {
      monsterDamage = this.calculateDamage(1, 20);
      this.playerHealth -= monsterDamage;
      this.activityLog.unshift({
        isPlayer: false,
        text: "Monster attacked you for " + monsterDamage
      });
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.gameIsRunning = false;
        this.systemMessage = "You Lost!";
      }
    },
    normalAttack: function() {
      playerDamage = this.calculateDamage(1, 10);
      this.monsterHealth -= playerDamage;
      this.activityLog.unshift({
        isPlayer: true,
        text: "You've attacked the monster for " + playerDamage
      });
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.gameIsRunning = false;
        this.systemMessage = "You WON!";
        return;
      }
      this.monsterAttack();
      this.playerStatus = "good";
    },
    specialAttack: function() {
      playerDamageSpecial = this.calculateDamage(5, 15);
      this.monsterHealth -= playerDamageSpecial;
      this.activityLog.unshift({
        isPlayer: true,
        text: "Your special attack did " + playerDamageSpecial + " damage."
      });
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.gameIsRunning = false;
        this.systemMessage = "You WON!";
        return;
      }
      this.monsterAttack();
      this.playerStatus = "exhausted";
    },
    healPlayer: function() {
      healAmount = this.calculateDamage(10, 30);
      this.playerHealth += healAmount;
      this.playerHealth >= 100 ? (this.playerHealth = 100) : {};
      this.playerStatus = "good";
      this.activityLog.unshift({
        isPlayer: true,
        text: "You healed yourself for " + healAmount
      });
      this.monsterAttack();
    },
    giveUp: function() {
      if (!confirm("Are you sure you want to give up?")) {
        return;
      } else {
        this.playerHealth = 0;
        this.gameIsRunning = false;
        this.systemMessage = "You gave up! YOU LOST!";
      }
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    }
  }
});
