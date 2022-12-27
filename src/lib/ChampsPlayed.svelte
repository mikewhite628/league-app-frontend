<script>
  import { apiData, matchData, mostPlayedData } from "../store.js";

  export let loaded;

  export let data;

  //Get all of the champions played over the last 20 games
  function getChampsPlayed(data) {
    let champsPlayed = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].info.participants.length; j++) {
        // @ts-ignore
        if (data[i].info.participants[j].puuid === $apiData.puuid) {
          let win = data[i].info.participants[j].win;
          let kills = data[i].info.participants[j].kills;
          let deaths = data[i].info.participants[j].deaths;
          let assists = data[i].info.participants[j].assists;

          champsPlayed.push({
            champion: data[i].info.participants[j].championName,
            win: win,
            kills: kills,
            deaths: deaths,
            assists: assists,
            runes: data[i].info.participants[j].perks.perkIds,
            masteries: data[i].info.participants[j].perks.statPerks,
          });
        }
      }
    }
    return { champsPlayed };
  }

  $: champsPlayed = getChampsPlayed(data).champsPlayed;

  //get champs played win rate and total games played
  function getChampsPlayedWinRate(champsPlayed) {
    let champsPlayedWinRate = [];
    let champsPlayedTotalGames = [];

    for (let i = 0; i < champsPlayed.length; i++) {
      let champ = champsPlayed[i].champion;
      let win = champsPlayed[i].win;

      if (champsPlayedWinRate[champ] === undefined) {
        champsPlayedWinRate[champ] = { wins: 0, losses: 0 };
        champsPlayedTotalGames[champ] = 0;
      }

      if (win) {
        champsPlayedWinRate[champ].wins += 1;
      } else {
        champsPlayedWinRate[champ].losses += 1;
      }

      champsPlayedTotalGames[champ] += 1;
    }

    return { champsPlayedWinRate, champsPlayedTotalGames };
  }

  $: champsPlayedWinRate =
    getChampsPlayedWinRate(champsPlayed).champsPlayedWinRate;
  $: champsPlayedTotalGames =
    getChampsPlayedWinRate(champsPlayed).champsPlayedTotalGames;

  //get champs played kda for each game and total kda and lowest common denominator
  function getChampsPlayedKDA(champsPlayed) {
    let champsPlayedKDA = [];
    let champsPlayedTotalKDA = [];
    let champsPlayedLCM = [];

    for (let i = 0; i < champsPlayed.length; i++) {
      let champ = champsPlayed[i].champion;
      let kills = champsPlayed[i].kills;
      let deaths = champsPlayed[i].deaths;
      let assists = champsPlayed[i].assists;

      if (champsPlayedKDA[champ] === undefined) {
        champsPlayedKDA[champ] = [];
        champsPlayedTotalKDA[champ] = { kills: 0, deaths: 0, assists: 0 };
        champsPlayedLCM[champ] = 0;
      }

      champsPlayedKDA[champ].push({
        kills: kills,
        deaths: deaths,
        assists: assists,
      });

      champsPlayedTotalKDA[champ].kills += kills;
      champsPlayedTotalKDA[champ].deaths += deaths;
      champsPlayedTotalKDA[champ].assists += assists;

      champsPlayedLCM[champ] += 1;
    }

    return { champsPlayedKDA, champsPlayedTotalKDA, champsPlayedLCM };
  }

  $: champsPlayedKDA = getChampsPlayedKDA(champsPlayed).champsPlayedKDA;
  $: champsPlayedTotalKDA =
    getChampsPlayedKDA(champsPlayed).champsPlayedTotalKDA;
  $: champsPlayedLCM = getChampsPlayedKDA(champsPlayed).champsPlayedLCM;

  //get champs played win rate and total games played
  function getChampsPlayedWinRatePercent(champsPlayedWinRate) {
    let champsPlayedWinRatePercent = [];

    for (let champ in champsPlayedWinRate) {
      let wins = champsPlayedWinRate[champ].wins;
      let losses = champsPlayedWinRate[champ].losses;
      let totalGames = wins + losses;
      let winRate = Math.floor((wins / totalGames) * 100);

      champsPlayedWinRatePercent[champ] = winRate;
    }

    return { champsPlayedWinRatePercent };
  }

  $: champsPlayedWinRatePercent =
    getChampsPlayedWinRatePercent(
      champsPlayedWinRate
    ).champsPlayedWinRatePercent;

  //sort champsPlayedWinRatePercent by most played
  function sortChampsPlayedWinRatePercent(champsPlayedWinRatePercent) {
    let sortedChampsPlayedWinRatePercent = [];

    for (let champ in champsPlayedWinRatePercent) {
      sortedChampsPlayedWinRatePercent.push({
        champ: champ,
        winRate: champsPlayedWinRatePercent[champ],
        totalGames: champsPlayedTotalGames[champ],
      });
    }

    sortedChampsPlayedWinRatePercent.sort((a, b) => {
      return b.totalGames - a.totalGames;
    });

    setMostPlayed();

    return { sortedChampsPlayedWinRatePercent };
  }

  $: sortedChampsPlayedWinRatePercent = sortChampsPlayedWinRatePercent(
    champsPlayedWinRatePercent
  ).sortedChampsPlayedWinRatePercent;

  $: mostPlayed = sortedChampsPlayedWinRatePercent[0];

  function setMostPlayed() {
    mostPlayedData.set(mostPlayed);
  }
</script>

{#if loaded}
  <h3>Champions Played</h3>
  <ul>
    {#each sortedChampsPlayedWinRatePercent as champ}
      <li>
        <div>
          <img
            class="icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{champ.champ}.png"
            alt={champ.champ}
          />
        </div>
        <div class="kpa-kda">
          <span
            >{champ.champ}: {champ.totalGames} game{champ.totalGames > 1
              ? "s"
              : ""}</span
          >
          <span> {champ.winRate}% Win Rate </span>
          <span>
            KDA:
            {Math.ceil(
              champsPlayedTotalKDA[champ.champ].kills /
                champsPlayedLCM[champ.champ]
            )}
            /
            {Math.ceil(
              champsPlayedTotalKDA[champ.champ].deaths /
                champsPlayedLCM[champ.champ]
            )}
            /
            {Math.ceil(
              champsPlayedTotalKDA[champ.champ].assists /
                champsPlayedLCM[champ.champ]
            )}
          </span>

          <span />
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style: none;
    padding: 0;
    font-size: 12px;
    justify-items: center;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    flex-direction: row;
    text-align: left;
    width: 100%;
  }

  .kpa-kda {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  .icon {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 991px) {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 1rem;
      justify-content: center;
      grid-template-rows: auto;
    }
  }

  @media (max-width: 500px) {
    .icon {
      width: 4rem;
      height: 4rem;
    }
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1rem;
      justify-content: center;
      grid-template-rows: auto;
    }
    li {
      flex-direction: column;
      width: fit-content;
    }
    .kpa-kda {
      margin-left: 0;
    }

    li div {
      margin: 0;
      font-size: 10px;
    }
  }
</style>
