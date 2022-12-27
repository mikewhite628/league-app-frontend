<script>
  //import blitz png as image
  import blitz from "../assets/blitz.png";

  //import victory image
  import victory from "../assets/victory.png";
</script>

<div class="container">
  <div class="transparent-layer" />
  <div style="background-image: url({victory})" class="banner-img" />
</div>
<main>
  <div class="wrapper">
    <p>
      This app grabs fun stats from a league of legends players most recent 20
      games. Things like average KDA, GPM, Vision Score, and DPM. This is a tool
      to gauge some of your current stats to see if there's any possible areas
      to improve in. Gold, vision, CS, and damage win games! Having visibility
      on those could be the difference between being iron and being plat+
    </p>

    <div>
      <img src={blitz} alt="Blitz" class="blitz-img" />
    </div>
    <p>
      This is a project is also a work in progress and will continue to evolve
      and display more complex data. If you have any suggestions or feedback,
      please feel free to reach out to me on twitter @Th3MichaelWhite on
      twitter.
    </p>
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
    height: 100%;
    max-width: 700px;
    margin: auto;
  }

  .container {
    position: relative;
    height: 30vh;
    width: 100%;
  }

  .banner-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 40%;
    background-repeat: no-repeat;
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

  .blitz-img {
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 300px;
  }
</style>
