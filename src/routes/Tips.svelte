<script>
  //import league1 image from assets folder
  import league1 from "../assets/league1.jpg";

  //create banner with leage1 image from assets folder
  let banner = league1;

  //create transparent layer
  let transparentLayer = "transparent-layer";
</script>

<div class="container">
  <div class="wrapper">
    <div class="transparent-layer" />
    <div class="champ-img" style="background-image: url({banner})" />
  </div>
</div>
<main>
  <div class="wrapper">
    <h2>Tips To Climb</h2>

    <div class="tips-inner">
      <h4>1. Gold wins games!</h4>
      <p>
        The most important thing to remember is that gold wins games. If you are
        ahead in gold, you are ahead in items, and if you are ahead in items,
        you are ahead in power. If you are ahead in power, you are ahead in the
        game.
      </p>

      <h4>2. Don't die!</h4>
      <p>
        If you are dead, you are not farming, you are not pushing, you are not
        defending, you are not doing anything. If you are not doing anything,
        you are losing gold. If you are losing gold, you are losing the game.
      </p>
      <h4>3. Don't be greedy</h4>
      <p>
        If you are greedy, you will die. If you die, you lose gold. If you lose
        gold, you lose the game.
      </p>
      <h4>4. Don't be afraid to back</h4>
      <p>
        If you are low on health, you are going to die. If you die, you lose
        gold. If you lose gold, you lose the game.
      </p>

      <h4>5. Keep Your Champion Pool Small</h4>
      <p>
        If you are playing a champion you are not familiar with, you are going
        to die. If you die, you lose gold. If you lose gold, you lose the game.
      </p>

      <h4>6. Vision Wins Games</h4>
      <p>
        If you have vision, you know where the enemy is. If you know where the
        enemy is, you can avoid them. If you can avoid them, you can farm. If
        you can farm, you can get ahead. If you get ahead, you win the game.
      </p>

      <h4>7. Mute All Other Players</h4>
      <p>
        If you mute all, you can focus on the game. If you can focus on the
        game, you can win the game.
      </p>

      <h4>Bonus!</h4>
      <p>
        Pretend your teamates are bots with random personalites and you're
        playing a single player game. Look at what they do and play around them.
        They dont think!
      </p>
    </div>
  </div>
</main>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  main {
    justify-content: flex-start;
  }

  .tips-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: left;
  }

  h2 {
    margin-bottom: 48px;
  }

  h4 {
    margin: 0;
    margin-bottom: 12px;
  }

  p {
    margin-top: 0;
    margin-bottom: 24px;
  }

  .container {
    position: relative;
    height: 40vh;
  }

  .wrapper {
    position: relative;
  }

  .transparent-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .champ-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-position: 50% 20%;
  }
</style>
