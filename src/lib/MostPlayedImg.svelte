<script>
  import { onDestroy, onMount } from "svelte";
  import { mostPlayedData } from "../store.js";

  export let champ;
  export let loaded;
</script>

<div>
  {#if champ && loaded}
    <div class="container">
      <div class="wrapper">
        <div class="transparent-layer" />
        <div
          class="champ-img"
          style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champ.champ}_0.jpg)"
        />
      </div>
    </div>
  {/if}
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

  .champ-img {
    width: 100vw;
    height: 30vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (min-width: 768px) {
    .champ-img {
      background-position: 50% 20%;
    }
  }
</style>
