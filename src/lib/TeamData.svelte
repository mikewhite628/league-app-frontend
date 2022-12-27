<script>
  // @ts-nocheck

  import { summonerData, runeData, apiData } from "../store.js";

  export let player;
  export let highestDamageDealtToChampions;
  export let checkSummonerSpell;

  function setWinLossColor() {
    if (player.win) {
      return "blue";
    } else {
      return "red";
    }
  }

  //fetch new summoner data and refresh page when summoner name is clicked
  function fetchSummonerData(player) {
    loaded = false;
    setTimeout(() => {
      fetch(`http://localhost:3000/api/summoner/${player}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(`apiData: ${$apiData}`);
          window.location.reload();
          apiData.set(data);
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    }, 1000);
  }
</script>

<div class="match-container">
  <div
    class="team-container {setWinLossColor()} {player.puuid === $apiData.puuid
      ? 'user'
      : 'null'}"
  >
    <div class="player-info ">
      <span class="player-icons">
        <span class="image-and-level">
          <img
            class="player-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{player.championName}.png"
            alt={player.championName}
          />
          <span class="level">{player.champLevel}</span>
        </span>
        <div class="icon-container">
          <div class="summoner-spell-icons">
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                player.summoner1Id
              )}.png"
              alt={checkSummonerSpell($summonerData, player)}
            />
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                player.summoner2Id
              )}.png"
              alt={checkSummonerSpell($summonerData, player)}
            />
          </div>
          <div class="rune-icons">
            <img
              class="runes"
              src="https://ddragon.leagueoflegends.com/cdn/img/{$runeData
                .find((rune) => rune.id === player.perks.styles[0].style)
                .slots[0].runes.find(
                  (rune) =>
                    rune.id === player.perks.styles[0].selections[0].perk
                ).icon}"
              alt={player.perks.styles[0].icon}
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
                (rune) => rune.id === player.perks.styles[1].style
              ).icon}"
              alt={player.perks.styles[1].icon}
            />
          </div>
        </div>
      </span>

      <a
        href={void 0}
        class="grid-item"
        on:click={() => fetchSummonerData(player.summonerName)}
      >
        {player.summonerName}
      </a>

      <div class="grid-item">
        {player.kills} / {player.deaths} / {player.assists}
      </div>
      <div class="grid-item">
        {player.totalDamageDealtToChampions}
        <div class="damage-done-bar">
          <div
            class="damage-done-bar-inner"
            style="width: {Math.floor(
              (player.totalDamageDealtToChampions /
                highestDamageDealtToChampions) *
                100
            )}%"
          />
        </div>
      </div>
      <div class="grid-item">{player.totalMinionsKilled}</div>
      <div class="grid-item">{player.goldEarned}</div>
      <div class="grid-item wards">
        {player.visionScore} ({player.detectorWardsPlaced})
      </div>

      <!-- <div>Role: {player.lane}</div> -->

      <div class="item-icon-container">
        {#if player.item0}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item0}.png"
            alt={player.item0}
          />
          <!-- {#if $itemData.data[player.item0]}
                  <div>{$itemData.data[player.item0].name}</div>
                  <div>
                    {@html $itemData.data[player.item0].description}
                  </div>
                {/if} -->
        {:else}
          <div class="item-icon empty" />
        {/if}

        {#if player.item1}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item1}.png"
            alt={player.item1}
          />
        {:else}
          <div class="item-icon empty" />
        {/if}
        {#if player.item2}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item2}.png"
            alt={player.item2}
          />
        {:else}
          <div class="item-icon empty" />
        {/if}
        {#if player.item6}
          <img
            class="item-icon ward"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item6}.png"
            alt={player.item6}
          />
        {/if}
        {#if player.item3}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item3}.png"
            alt={player.item3}
          />
        {:else}
          <div class="item-icon empty" />
        {/if}
        {#if player.item4}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item4}.png"
            alt={player.item4}
          />
        {:else}
          <div class="item-icon empty" />
        {/if}
        {#if player.item5}
          <img
            class="item-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item5}.png"
            alt={player.item5}
          />
        {:else}
          <div class="item-icon empty" />
        {/if}
      </div>
    </div>

    <div class="player-info mobile">
      <span class="player-icons">
        <span class="image-and-level">
          <img
            class="player-icon"
            src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/{player.championName}.png"
            alt={player.championName}
          />
          <span class="level">{player.champLevel}</span>
        </span>
        <div class="icon-container">
          <div class="summoner-spell-icons">
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                player.summoner1Id
              )}.png"
              alt={checkSummonerSpell($summonerData, player)}
            />
            <img
              class="sums"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/{checkSummonerSpell(
                $summonerData,
                player.summoner2Id
              )}.png"
              alt={checkSummonerSpell($summonerData, player)}
            />
          </div>
          <div class="rune-icons">
            <img
              class="runes"
              src="https://ddragon.leagueoflegends.com/cdn/img/{$runeData
                .find((rune) => rune.id === player.perks.styles[0].style)
                .slots[0].runes.find(
                  (rune) =>
                    rune.id === player.perks.styles[0].selections[0].perk
                ).icon}"
              alt={player.perks.styles[0].icon}
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
                (rune) => rune.id === player.perks.styles[1].style
              ).icon}"
              alt={player.perks.styles[1].icon}
            />
          </div>
        </div>
      </span>

      <div class="grid-item">
        <a
          href={void 0}
          class="grid-item"
          on:click={() => fetchSummonerData(player.summonerName)}
        >
          {player.summonerName}
        </a>
        {player.kills} / {player.deaths} / {player.assists}
      </div>

      <div class="grid-item wards">
        {player.visionScore} ({player.detectorWardsPlaced})
      </div>

      <!-- <div>Role: {player.lane}</div> -->
      <div class="item-and-damage">
        <div class="item-icon-container">
          {#if player.item0}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item0}.png"
              alt={player.item0}
            />
            <!-- {#if $itemData.data[player.item0]}
                  <div>{$itemData.data[player.item0].name}</div>
                  <div>
                    {@html $itemData.data[player.item0].description}
                  </div>
                {/if} -->
          {:else}
            <div class="item-icon empty" />
          {/if}

          {#if player.item1}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item1}.png"
              alt={player.item1}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}
          {#if player.item2}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item2}.png"
              alt={player.item2}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}

          {#if player.item3}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item3}.png"
              alt={player.item3}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}
          {#if player.item4}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item4}.png"
              alt={player.item4}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}
          {#if player.item5}
            <img
              class="item-icon"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item5}.png"
              alt={player.item5}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}
          {#if player.item6}
            <img
              class="item-icon ward"
              src="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/{player.item6}.png"
              alt={player.item6}
            />
          {:else}
            <div class="item-icon empty" />
          {/if}
        </div>
        <div class="grid-item damage-and-cs">
          <div class="grid-item">{player.totalMinionsKilled} cs</div>
          <div class="damage-done-bar">
            <div
              class="damage-done-bar-inner"
              style="width: {Math.floor(
                (player.totalDamageDealtToChampions /
                  highestDamageDealtToChampions) *
                  100
              )}%"
            />
            <div class="damage-number">
              {player.totalDamageDealtToChampions}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
  }
  .match-container {
    font-size: 14px;
  }

  .team-container {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
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
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr 1fr 1fr;
    width: 100%;
  }

  .runes,
  .sums {
    max-width: 15px !important;
    max-height: 15px;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    margin-left: 2px;
  }

  .player-icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .item-icon-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: fit-content;
  }

  .item-icon {
    max-width: 25px !important;
    max-height: 20px;
    margin: 3px;
  }

  a {
    cursor: pointer;
  }

  .player-icon {
    width: 40px !important;
    height: 40px !important;
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

  .user {
    border: 2px solid yellow;
  }

  .ward {
    grid-column-start: col-start 4;
  }

  .player-info.mobile {
    display: none;
  }

  .player-info.mobile .item-icon-container {
    display: flex;
    flex-direction: row;
    height: fit-content;
    justify-content: end;
  }

  .item-icon.empty {
    background: #1a1a1a;
    opacity: 0.9;
  }

  a.grid-item {
    color: white !important;
  }

  .player-info.grid-item {
    font-weight: 700;
  }

  @media (max-width: 1160px) {
    .item-icon {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 767px) {
    .grid-item {
      font-size: 10px !important;
    }
    .grid-item.wards {
      display: none;
    }
    .player-info {
      grid-template-columns: 1.5fr 1fr 1fr 1fr 0.5fr 0.5fr 1fr;
    }
    .damage-done-bar {
      width: 50px;
      height: 12px;
      position: relative;
    }
    .damage-done-bar-inner {
      height: 12px;
      width: 50px;
    }
    .damage-number {
      position: absolute;
      top: -5px;
      left: 12px;
      font-size: 10px;
      max-height: 12px;
      margin-left: auto;
      margin-right: auto;
      z-index: 10;
    }
  }

  .player-info.mobile {
    grid-template-columns: 1.5fr 1fr 2fr;
  }

  .item-and-damage {
    padding-right: 8px;
    padding-bottom: 8px;
  }

  .damage-and-cs {
    justify-content: end;
    align-items: end;
  }

  @media (max-width: 750px) {
    .player-info.mobile {
      display: grid;
    }

    .player-info {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .player-info.mobile {
      grid-template-columns: 1fr 1fr 1fr;
      align-items: stretch;
    }
    .item-icon {
      margin: 1px;
    }
  }
</style>
