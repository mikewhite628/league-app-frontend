<script>
  import { rankedData } from "../store";

  console.log($rankedData);
</script>

{#each $rankedData as rank}
  {#if rank.queueType === "RANKED_SOLO_5x5"}
    {#if rank.tier === "IRON"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/iron.png"
        alt="iron"
      />
    {:else if rank.tier === "BRONZE"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/bronze.png"
        alt="bronze"
      />
    {:else if rank.tier === "SILVER"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/silver.png"
        alt="silver"
      />
    {:else if rank.tier === "GOLD"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/gold.png"
        alt="gold"
      />
    {:else if rank.tier === "PLATINUM"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/platinum.png"
        alt="platinum"
      />
    {:else if rank.tier === "DIAMOND"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/diamond.png"
        alt="diamond"
      />
    {:else if rank.tier === "MASTER"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/master.png"
        alt="master"
      />
    {:else if rank.tier === "GRANDMASTER"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/grandmaster.png"
        alt="grandmaster"
      />
    {:else if rank.tier === "CHALLENGER"}
      <img
        class="rank-icon"
        src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/challenger.png"
        alt="challenger"
      />
    {:else}
      <h3>Unranked</h3>
    {/if}

    <div class="ranked-info">
      <span>Ranked Solo/Duo</span>
      <span>
        {rank.tier}
        {rank.rank} -
        {rank.leaguePoints} LP
      </span>
      <!-- {rank.wins}W {rank.losses}L -->
    </div>
  {/if}
{/each}

<style>
  .rank-icon {
    width: 150px;
    height: 150px;
  }

  .ranked-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
