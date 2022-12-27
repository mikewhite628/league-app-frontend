<script>
  // @ts-nocheck

  // @ts-nocheck
  import { apiData, matchData } from "../store.js";
  import PlayerData from "./PlayerData.svelte";
  import TeamData from "./TeamData.svelte";

  export let loaded;

  function checkSummonerSpell($summonerData, player) {
    if ($summonerData.data["SummonerBoost"]["key"] == player) {
      return $summonerData.data["SummonerBoost"]["id"];
    }
    if ($summonerData.data["SummonerDot"]["key"] == player) {
      return $summonerData.data["SummonerDot"]["id"];
    }
    if ($summonerData.data["SummonerExhaust"]["key"] == player) {
      return $summonerData.data["SummonerExhaust"]["id"];
    }
    if ($summonerData.data["SummonerFlash"]["key"] == player) {
      return $summonerData.data["SummonerFlash"]["id"];
    }
    if ($summonerData.data["SummonerHaste"]["key"] == player) {
      return $summonerData.data["SummonerHaste"]["id"];
    }
    if ($summonerData.data["SummonerHeal"]["key"] == player) {
      return $summonerData.data["SummonerHeal"]["id"];
    }
    if ($summonerData.data["SummonerMana"]["key"] == player) {
      return $summonerData.data["SummonerMana"]["id"];
    }
    if ($summonerData.data["SummonerSmite"]["key"] == player) {
      return $summonerData.data["SummonerSmite"]["id"];
    }
    if ($summonerData.data["SummonerTeleport"]["key"] == player) {
      return $summonerData.data["SummonerTeleport"]["id"];
    }
    if ($summonerData.data["SummonerBarrier"]["key"] == player) {
      return $summonerData.data["SummonerBarrier"]["id"];
    }
    if ($summonerData.data["SummonerPoroRecall"]["key"] == player) {
      return $summonerData.data["SummonerPoroRecall"]["id"];
    }
    if ($summonerData.data["SummonerPoroThrow"]["key"] == player) {
      return $summonerData.data["SummonerPoroThrow"]["id"];
    }
    if ($summonerData.data["SummonerSnowball"]["key"] == player) {
      return $summonerData.data["SummonerSnowball"]["id"];
    }
  }

  let hide;
  //toggle the match details display for each specific match
  function toggleMatchDetails(e) {
    let matchDetails = e.target.parentElement.parentElement.nextElementSibling;
    if (matchDetails.classList.contains("hide")) {
      hide = false;
      matchDetails.classList.remove("hide");
    } else {
      matchDetails.classList.add("hide");
    }
  }

  //find highest damage dealt to champions
  function getHighestDamageDealtToChampions(match) {
    let highestDamageDealtToChampions = 0;
    for (let i = 0; i < match.info.participants.length; i++) {
      if (
        match.info.participants[i].totalDamageDealtToChampions >
        highestDamageDealtToChampions
      ) {
        highestDamageDealtToChampions =
          match.info.participants[i].totalDamageDealtToChampions;
      }
    }

    return highestDamageDealtToChampions;
  }
</script>

<main>
  {#each $matchData as match, i}
    <div class="match-details">
      <div>Match {i + 1}</div>
      <diV>
        {#if match.info.participants.find((participant) => participant.puuid === $apiData.puuid).win}
          <div class="win">Victory</div>
        {:else}
          <div class="loss">Defeat</div>
        {/if}
      </diV>
      <!-- <div>{match.info.gameId}</div> -->
      <div>
        Date:
        {new Date(match.info.gameCreation).toLocaleDateString()}{" "}
      </div>
      <div>
        Duration:
        {Math.floor(match.info.gameDuration / 60)}:{match.info.gameDuration %
          60 <
        10
          ? "0" + (match.info.gameDuration % 60)
          : match.info.gameDuration % 60}
      </div>
      <div>
        {Math.floor(
          (new Date().getTime() - match.info.gameCreation) / 1000 / 60 / 60
        ) < 24
          ? Math.floor(
              (new Date().getTime() - match.info.gameCreation) / 1000 / 60 / 60
            ) + " hours ago"
          : Math.floor(
              (new Date().getTime() - match.info.gameCreation) /
                1000 /
                60 /
                60 /
                24
            ) + " days ago"}
      </div>
    </div>

    {#each match.info.participants as participant, i}
      {#if participant.puuid === $apiData.puuid}
        {#if loaded}
          <div class="match-container">
            <PlayerData
              {participant}
              {match}
              {checkSummonerSpell}
              {toggleMatchDetails}
              highestDamageDealtToChampions={getHighestDamageDealtToChampions(
                match
              )}
              {i}
            />

            <div class="hide match-details-container">
              <div class="header">
                <div>Champion</div>
                <div>Name</div>
                <div>KDA</div>
                <div>Damage</div>
                <div>CS</div>
                <div>Gold</div>
                <div class="wards">Vision (pinks)</div>
                <div>Items</div>
              </div>
              <div class="mobile header">
                <div>Champion</div>
                <div>Name / KDA</div>
                <div>Items / CS / Damage</div>
              </div>
              {#each match.info.participants as player}
                <TeamData
                  {player}
                  {checkSummonerSpell}
                  highestDamageDealtToChampions={getHighestDamageDealtToChampions(
                    match
                  )}
                />
              {/each}
            </div>
          </div>
        {/if}
      {/if}
    {/each}
  {/each}
</main>

<style>
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr 1fr 1fr;
    width: 100%;
  }

  .match-details {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-top: 24px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .match-container {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 100%;
  }

  .match-container,
  .match-details {
    max-width: 930px;
  }

  .match-details-container {
    max-height: 800px;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .match-details-container.hide {
    max-height: 0;
    overflow: hidden;
    height: 700px;
    transition: max-height 0.5s ease-in-out;
  }

  .win {
    color: rgba(29, 49, 235);
  }

  .loss {
    color: rgb(230, 52, 52);
  }

  .mobile.header {
    display: none;
  }

  @media (max-width: 1160px) {
    .header {
      font-size: 12px;
    }
  }

  @media (max-width: 767px) {
    .header {
      grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr 1fr;
    }
    .wards {
      display: none;
    }
    main {
      padding: 0;
    }
  }

  @media (max-width: 750px) {
    .header {
      display: none;
    }
    .mobile.header {
      display: grid;
      grid-template-columns: 0.7fr 1fr 1fr;
    }
  }

  @media (max-width: 590px) {
    .match-details {
      font-size: 10px;
      width: 100%;
    }

    main {
      align-items: normal;
    }
  }

  @media (max-width: 500px) {
    .mobile.header {
      grid-template-columns: 0.9fr 1fr 1fr;
    }
  }
</style>
