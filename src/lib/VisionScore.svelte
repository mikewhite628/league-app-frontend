<script>
  // @ts-nocheck

  import { apiData, matchData } from "../store.js";
  //get vision score per game for user
  function getVisionScore($matchData) {
    let visionScore = [];

    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        if ($matchData[i].info.participants[j].puuid === $apiData.puuid) {
          let visionScorePerGame =
            $matchData[i].info.participants[j].visionScore;

          visionScore.push(visionScorePerGame);
        }
      }
    }

    return { visionScore };
  }

  $: visionScore = getVisionScore($matchData).visionScore;
</script>

<span>
  <h5>Vision Score:</h5>
  <p>
    {Math.ceil(visionScore.reduce((a, b) => a + b, 0) / visionScore.length)}
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
