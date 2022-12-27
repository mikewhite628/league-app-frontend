<script>
  import { matchData, apiData } from "../store.js";
  function getWins($matchData) {
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        // @ts-ignore
        if ($matchData[i].info.participants[j].puuid == $apiData.puuid) {
          if ($matchData[i].info.participants[j].win == true) {
            wins++;
          } else {
            losses++;
          }
        }
      }
    }
    console.log(`wins: ${wins}`);
    return { wins, losses };
  }

  $: wins = getWins($matchData).wins;
  $: losses = getWins($matchData).losses;
  $: winRate = Math.floor((wins / $matchData.length) * 100);
</script>

<h4>Wins: {wins} / Losses {losses}</h4>
<div class="wins-loss">
  <div class="small c100 p{winRate}">
    <span>{winRate}%</span>
    <div class="slice">
      <div class="bar" />
      <div class="fill" />
    </div>
  </div>
</div>

<style>
  .c100 {
    background-color: rgb(230, 52, 52);
  }
  .wins-loss {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
