<script>
  // @ts-nocheck

  import { onMount, afterUpdate } from "svelte";
  import { apiData, matchData, rankedData } from "../store.js";
  import Champimg from "../lib/Champimg.svelte";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

  let summonerName = "drunken wanderer";
  let notFound = "false";

  onMount(async () => {
    fetch(`http://localhost:3000/api/summoner/${summonerName}`)
      .then((response) => response.json())
      .then((data) => {
        apiData.set(data);
        console.log(`apiData: ${$apiData}`);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });

  async function searchName() {
    fetch(`http://localhost:3000/api/summoner/${summonerName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        apiData.set(data);
        notFound = "false";
        console.log(`apiData: ${$apiData}`);
      })
      .then(() => {
        fetch(`http://localhost:3000/api/rank?summonerId=${$apiData.id}`)
          .then((response) => response.json())
          .then((data) => {
            rankedData.set(data);
            console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
        notFound = "true";
        return [];
      });
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        searchName();
        break;
    }
  }

  $: icon = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${$apiData.profileIconId}.png`;
</script>

<svelte:head>
  <title>Summoner Search</title>
  <meta name="description" content="Summoner Search" />
  <link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>
<main>
  <div class="wrapper">
    <Champimg />
    <h2>Summoner Search</h2>
    <div class="search">
      <input
        type="text"
        bind:value={summonerName}
        on:keydown={onKeyDown}
        placeholder="Enter Summoner Name"
      />
      <button on:click={searchName} on:keydown={onkeydown}>Search</button>
    </div>

    {#if notFound == "true"}
      <h2>Summoner Not Found</h2>
    {:else}
      <div>
        <a href="/details/{$apiData.name}" use:link use:active
          ><h2>{$apiData.name}</h2></a
        >
        <h3>Summoner Level: {$apiData.summonerLevel}</h3>

        <img src={icon} alt="Summoner Icon" />
      </div>
    {/if}
  </div>
</main>

<style>
  img {
    max-width: 100%;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  main {
    justify-content: flex-start;
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .search input {
    width: 320px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 46px;
    border: none;
  }

  .search input:focus {
    outline: none;
  }

  .search button {
    width: 120px;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .search button:focus {
    border: none;
  }

  .search button:hover {
    background-color: #45a049;
  }

  @media (max-width: 500px) {
    .search {
      width: inherit;
    }
  }
</style>
