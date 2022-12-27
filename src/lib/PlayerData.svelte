<script>
  // @ts-nocheck

  import { summonerData, runeData, apiData, matchData } from "../store.js";
  import Icon from "svelte-awesome";
  import { arrowDown, arrowUp } from "svelte-awesome/icons";
  import { Jumper } from "svelte-loading-spinners";

  export let participant;
  export let checkSummonerSpell;
  export let toggleMatchDetails;
  export let match;
  export let highestDamageDealtToChampions;
  export let i;

  function setWinLossColor(participant) {
    if (participant.win) {
      return "blue";
    } else {
      return "red";
    }
  }

  //fetch new summoner data and refresh page when summoner name is clicked
  function fetchSummonerData(player) {
    fetch(`http://localhost:3000/api/summoner/${player}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`apiData: ${$apiData}`);
        apiData.set(data);
        window.location.reload();
        matchData.set([]);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  function showHideMatchDetails(e) {
    toggleMatchDetails(e);
    e.target.children[0].classList.toggle("rotate");
  }
</script>

<div class="match-container">
  <div class="team-container {setWinLossColor(participant)}">
    <div class="match-result" />
    <div class="player-info">
      <span class="player-icons">
        <div class="image-and-level">
          <img
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{participant.championName}.png"
            alt={participant.championName}
          />
          <span class="level">{participant.champLevel}</span>
        </div>

        <div class="icon-container">
          <div class="summoner-spell-icons">
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                participant.summoner1Id
              )}.png"
              alt={checkSummonerSpell($summonerData, participant)}
            />
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                participant.summoner2Id
              )}.png"
              alt={checkSummonerSpell($summonerData, participant)}
            />
          </div>
          <div class="rune-icons">
            <img
              class="runes"
              src="https://ddragon.leagueoflegends.com/cdn/img/{$runeData
                .find((rune) => rune.id === participant.perks.styles[0].style)
                .slots[0].runes.find(
                  (rune) =>
                    rune.id === participant.perks.styles[0].selections[0].perk
                ).icon}"
              alt={participant.perks.styles[0].icon}
            />
            <!-- Primary Rune:
            {$runeData
              .find((rune) => rune.id === participant.perks.styles[0].style)
              .slots[0].runes.find(
                (rune) =>
                  rune.id === participant.perks.styles[0].selections[0].perk
              ).name}

            Sub Rune: {$runeData.find(
              (rune) => rune.id === participant.perks.styles[1].style
            ).name} -->
            <img
              class="runes"
              src="https://ddragon.leagueoflegends.com/cdn/img/{$runeData.find(
                (rune) => rune.id === participant.perks.styles[1].style
              ).icon}"
              alt={participant.perks.styles[1].icon}
            />
          </div>
        </div>
      </span>

      <div class="grid-item damage">
        Damage Dealt: {participant.totalDamageDealtToChampions}
        <div class="damage-done-bar">
          <div
            class="damage-done-bar-inner"
            style="width: {Math.floor(
              (participant.totalDamageDealtToChampions /
                highestDamageDealtToChampions) *
                100
            )}%"
          />
        </div>
      </div>
      <div class="stats">
        <div class="grid-item kda">
          {participant.kills} / {participant.deaths} / {participant.assists}
        </div>
        <div class="grid-item cs">
          {participant.totalMinionsKilled} cs
        </div>
        <div class="grid-item vision">
          {participant.visionScore} vision
        </div>
      </div>

      <!-- <div>Role: {player.lane}</div> -->

      <div class="item-icon-container">
        {#if participant.item0}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item0}.png"
            alt={participant.item0}
          />
          <!-- {#if $itemData.data[player.item0]}
                  <div>{$itemData.data[player.item0].name}</div>
                  <div>
                    {@html $itemData.data[player.item0].description}
                  </div>
                {/if} -->
        {/if}

        {#if participant.item1}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item1}.png"
            alt={participant.item1}
          />
        {/if}
        {#if participant.item2}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item2}.png"
            alt={participant.item2}
          />
        {/if}
        {#if participant.item3}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item3}.png"
            alt={participant.item3}
          />
        {/if}
        {#if participant.item4}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item4}.png"
            alt={participant.item4}
          />
        {/if}
        {#if participant.item5}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{participant.item5}.png"
            alt={participant.item5}
          />
        {/if}
      </div>
      <div class="all-player-icons grind-item">
        <div class="player-team">
          {#each match.info.participants as players}
            {#if players.teamId === participant.teamId}
              <div class="name-and-image">
                <a
                  class="grid-item"
                  target="_self"
                  href={`/#/details/${players.summonerName}`}
                  on:click={() => fetchSummonerData(players.summonerName)}
                >
                  <img
                    src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{players.championName}.png"
                    alt={players.championName}
                  />
                  {#if players.summonerName === participant.summonerName}
                    <span class="user-name">
                      {players.summonerName.substring(0, 8) + "..."}
                    </span>
                  {:else}
                    <span class="other-name">
                      {players.summonerName.substring(0, 8) + "..."}
                    </span>
                  {/if}
                </a>
              </div>
            {/if}
          {/each}
        </div>
        <div class="other-team">
          {#each match.info.participants as players}
            {#if players.teamId != participant.teamId}
              <div class="name-and-image">
                <a
                  href={null}
                  class="grid-item"
                  on:click={() => fetchSummonerData(players.summonerName)}
                >
                  <img
                    src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{players.championName}.png"
                    alt={players.championName}
                  />

                  {players.summonerName.substring(0, 8) + "..."}
                </a>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
    <button
      class="details button-{i}"
      type="button"
      on:click={(e) => showHideMatchDetails(e)}
    >
      <div class="detailsDrop">
        <Icon class="icon" data={arrowDown} scale="1" />
      </div>
      <div class="detailsDrop mobile">
        <Icon class="icon" data={arrowDown} scale=".5" />
      </div>
    </button>
  </div>
</div>

<style>
  .match-result {
    text-align: left;
  }
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
  }

  .image-and-level {
    position: relative;
  }
  .level {
    position: absolute;
    right: 0;
    bottom: 7px;
    height: 12px;
    width: 16px;
    padding: 2px;
    background-color: black;
    opacity: 0.7;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
  }
  .team-container {
    position: relative;
    padding: 10px !important;
  }
  .stats {
    font-size: 11px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
  }

  .all-player-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .name-and-image {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name-and-image img {
    margin-right: 5px;
  }
  .name-and-image a {
    font-size: 10px;
    width: 90px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-start;
  }
  .player-team {
    display: flex;
    flex-direction: column;
  }
  .other-team {
    display: flex;
    flex-direction: column;
  }

  .all-player-icons img {
    width: 20px;
    height: 20px;
  }
  .team-container {
    display: flex;
    flex-direction: column;

    padding: 1rem;
  }

  .team-container.red {
    background-color: rgb(230, 52, 52, 0.5);
  }
  .team-container.blue {
    background-color: rgba(29, 49, 235, 0.5);
  }

  .team-container img {
    max-width: 50px;
    max-height: 50px;
  }

  .player-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    align-items: center;
  }

  .runes,
  .sums {
    max-width: 20px !important;
    max-height: 20px;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    margin-left: 2px;
  }

  .player-icons {
    display: flex;
    justify-content: center;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .grid-item.name,
  .grid-item.damage {
    font-size: 12px;
  }
  .item-icon-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: fit-content;
  }

  .item-icon {
    max-width: 25px !important;
    max-height: 20px;
    padding: 3px;
  }

  .user-name {
    color: #f5f5f5;
    font-weight: bold;
  }

  .damage-done-bar {
    width: 100%;
    background-color: #585757;
    height: 15px;

    border-radius: 5px;
  }
  .damage-done-bar-inner {
    background-color: #fe6c85;
    height: 15px;
    border-radius: 5px;
  }

  .kda {
    font-size: 18px;
  }

  .details {
    position: absolute;
    right: -27px;
    top: -24px;
    height: 165px;
    padding-left: 5px;
    padding-right: 5px;
    width: auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .details button:active {
    border: none !important;
    background-color: transparent;
    cursor: pointer;
  }

  .detailsDrop {
    pointer-events: none;
    transition: transform 0.5s;
  }
  .rotate {
    transition: transform 0.5s;
    transform: rotate(180deg) !important;
  }

  .detailsDrop.mobile {
    display: none !important;
  }

  @media (max-width: 875px) {
    .item-icon {
      max-width: 20px !important;
      max-height: 20px;
      padding: 3px;
    }

    .all-player-icons img {
      width: 15px;
      height: 15px;
    }

    .name-and-image a {
      align-items: center;
    }

    .grid-item.damage {
      font-size: 10px;
    }

    .grid-item {
      font-size: 10px;
    }
  }

  @media (max-width: 767px) {
    .all-player-icons {
      display: none;
    }
    .player-info {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .details {
      height: 117px;
    }
  }

  @media (max-width: 590px) {
    .image-and-level img {
      width: 40px;
      height: 40px;
    }

    .runes,
    .sums {
      max-width: 15px !important;
      max-height: 15px;
    }
  }
  @media (max-width: 500px) {
    .details {
      right: -11px;
      width: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon {
      width: 8px;
    }

    .detailsDrop {
      display: none;
    }

    .detailsDrop.mobile {
      display: flex !important;
      pointer-events: auto;
    }
  }
</style>
