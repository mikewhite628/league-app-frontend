<script>
  import { matchData, apiData } from "../store.js";

  //get roles played
  function getRolesPlayed($matchData) {
    let rolesPlayed = [];

    for (let i = 0; i < $matchData.length; i++) {
      for (let j = 0; j < $matchData[i].info.participants.length; j++) {
        // @ts-ignore
        if ($matchData[i].info.participants[j].puuid === $apiData.puuid) {
          let rolePlayed =
            $matchData[i].info.participants[j].individualPosition;
          rolesPlayed.push(rolePlayed);
        }
      }
    }

    return { rolesPlayed };
  }

  $: rolesPlayed = getRolesPlayed($matchData).rolesPlayed;
</script>

<div class="role-circles">
  {#if rolesPlayed.filter((role) => role === "TOP").length > 0}
    <div
      class="small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'TOP').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/top.png"
          alt="top lane icon"
        />
        {Math.round(
          (rolesPlayed.filter((role) => role === "TOP").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}
  {#if rolesPlayed.filter((role) => role === "JUNGLE").length > 0}
    <div
      class="small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'JUNGLE').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/jungle.png"
          alt="top lane icon"
        />
        {Math.round(
          (rolesPlayed.filter((role) => role === "JUNGLE").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}
  {#if rolesPlayed.filter((role) => role === "MIDDLE").length > 0}
    <div
      class="small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'MIDDLE').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/mid.png"
          alt="top lane icon"
        />{Math.round(
          (rolesPlayed.filter((role) => role === "MIDDLE").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}

  {#if rolesPlayed.filter((role) => role === "BOTTOM").length > 0}
    <div
      class=" small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'BOTTOM').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/bottom.png"
          alt="top lane icon"
        />{Math.round(
          (rolesPlayed.filter((role) => role === "BOTTOM").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}

  {#if rolesPlayed.filter((role) => role === "UTILITY").length > 0}
    <div
      class="small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'UTILITY').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/support.png"
          alt="top lane icon"
        />{Math.round(
          (rolesPlayed.filter((role) => role === "UTILITY").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}
  {#if rolesPlayed.filter((role) => role === "Invalid").length > 0}
    <div
      class="small c100 p{Math.round(
        (rolesPlayed.filter((role) => role === 'Invalid').length /
          rolesPlayed.length) *
          100
      )}"
    >
      <span class="inner-lane-circle">
        <img
          class="lane-icon"
          src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/fill.png"
          alt="top lane icon"
        />
        {Math.round(
          (rolesPlayed.filter((role) => role === "Invalid").length /
            rolesPlayed.length) *
            100
        )}%</span
      >
      <div class="slice">
        <div class="bar" />
        <div class="fill" />
      </div>
    </div>
  {/if}
</div>

<style>
  .inner-lane-circle {
    display: flex;
    line-height: initial !important;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
  }

  .lane-icon {
    height: 30px;
    width: 30px;
  }

  .role-circles {
    display: flex;
    justify-content: center;
  }
</style>
