<script>
  let champImages = [
    "Zoe_1.jpg",
    "Zoe_2.jpg",
    "Zyra_4.jpg",
    "Aatrox_7.jpg",
    "Ahri_15.jpg",
    "Akali_9.jpg",
    "Ashe_11.jpg",
    "Caitlyn_19.jpg",
    "Darius_15.jpg",
    "Ekko_19.jpg",
    "Garen_13.jpg",
    "Hecarim_8.jpg",
    "Irelia_6.jpg",
  ];

  let randomChamp = champImages[Math.floor(Math.random() * champImages.length)];
</script>

<div class="container">
  <div class="wrapper">
    <div class="transparent-layer" />
    <h1>League of Legends</h1>
    <div
      class="champ-img"
      style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{randomChamp})"
    />
    <!-- <img
      src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{randomChamp}"
      alt="Champion Splash Art"
    /> -->
  </div>
</div>

<style>
  .container {
    position: relative;
    width: 100vw;
  }
  .transparent-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 800px;
    overflow: hidden;
    width: 100vw;
  }
  h1 {
    position: absolute;
  }
  .champ-img {
    width: 100vw;
    height: 42vh;
    background: url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{randomChamp}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (min-width: 768px) {
    .champ-img {
      background-position: 50% 0%;
    }
  }
</style>
