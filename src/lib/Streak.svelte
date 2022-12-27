<script>
  // @ts-nocheck

  import { apiData, matchData } from "../store.js";

  export let loaded;
  //match data to sort

  //sort games by date played and check for win or loss streak
  function getWinLossStreak(matchDataByDate) {
    let winStreak = 0;
    let lossStreak = 0;
    //sort games by most recent
    matchDataByDate.sort((a, b) => {
      return a.info.gameStartTimestamp - b.info.gameStartTimestamp;
    });

    for (let i = 0; i < matchDataByDate.length; i++) {
      for (let j = 0; j < matchDataByDate[i].info.participants.length; j++) {
        if (matchDataByDate[i].info.participants[j].puuid === $apiData.puuid) {
          let win = matchDataByDate[i].info.participants[j].win;

          if (win) {
            winStreak += 1;
            lossStreak = 0;
          } else {
            lossStreak += 1;
            winStreak = 0;
          }
        }
      }
    }
    matchDataByDate.sort((a, b) => {
      return b.info.gameStartTimestamp - a.info.gameStartTimestamp;
    });
    return { winStreak, lossStreak };
  }
  $: matchDataByDate = $matchData;
  $: winStreak = getWinLossStreak(matchDataByDate).winStreak;
  $: lossStreak = getWinLossStreak(matchDataByDate).lossStreak;
</script>

<span>
  {#if loaded}
    {#if winStreak > 0}
      <h5>Win Streak:</h5>
      <p>{winStreak}</p>
    {:else if lossStreak > 0}
      <h5>Loss Streak:</h5>
      <p>{lossStreak}</p>
    {/if}
  {/if}
</span>

<style>
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h5 {
    margin: 0;
  }
  p {
    margin: 0;
    margin-left: 5px;
  }
</style>
