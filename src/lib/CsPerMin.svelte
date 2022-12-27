<script>
  import { matchData, apiData } from "../store.js";
  //get cs per minute for user
  function getCsPerMinute($matchData) {
    let csPerMinute = [];

    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        // @ts-ignore
        if ($matchData[i].info.participants[j].puuid === $apiData.puuid) {
          let csPerMinutePerGame =
            $matchData[i].info.participants[j].totalMinionsKilled /
            ($matchData[i].info.gameDuration / 60);

          csPerMinute.push(csPerMinutePerGame);
        }
      }
    }

    return { csPerMinute };
  }

  $: csPerMinute = getCsPerMinute($matchData).csPerMinute;
</script>

<span>
  <h5>CS Per Minute:</h5>
  <p>
    {Math.ceil(csPerMinute.reduce((a, b) => a + b, 0) / csPerMinute.length)}
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
