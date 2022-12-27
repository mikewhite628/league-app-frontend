<script>
  import { apiData, matchData } from "../store.js";
  function getGoldPerMinute($matchData) {
    let goldPerMinute = [];

    //get gold per minute for total gold divided by match length converted to minutes
    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        // @ts-ignore
        if ($matchData[i].info.participants[j].puuid === $apiData.puuid) {
          let goldPerMinutePerGame =
            ($matchData[i].info.participants[j].goldEarned - 500) /
            ($matchData[i].info.gameDuration / 60);

          goldPerMinute.push(goldPerMinutePerGame);
        }
      }
    }

    return { goldPerMinute };
  }

  $: goldPerMinute = getGoldPerMinute($matchData).goldPerMinute;
</script>

<span>
  <h5>Gold Per Minute:</h5>
  <p>
    {Math.ceil(goldPerMinute.reduce((a, b) => a + b, 0) / goldPerMinute.length)}
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
