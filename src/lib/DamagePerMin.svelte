<script>
  import { apiData, matchData } from "../store.js";

  function getDamagePerMinute($matchData) {
    let damagePerMinute = [];

    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        // @ts-ignore
        if ($matchData[i].info.participants[j].puuid === $apiData.puuid) {
          let damagePerMinutePerGame =
            $matchData[i].info.participants[j].totalDamageDealtToChampions /
            ($matchData[i].info.gameDuration / 60);

          damagePerMinute.push(damagePerMinutePerGame);
        }
      }
    }

    return { damagePerMinute };
  }

  $: damagePerMinute = getDamagePerMinute($matchData).damagePerMinute;
</script>

<span>
  <h5>Damage Per Minute:</h5>

  <p>
    {Math.floor(
      damagePerMinute.reduce((a, b) => a + b, 0) / damagePerMinute.length
    )}
  </p>
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
