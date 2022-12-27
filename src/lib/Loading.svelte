<script>
  import { Jumper } from "svelte-loading-spinners";
</script>

<div class="loading">
  <Jumper />
</div>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    width: 100%;
    z-index: 100;
    background: black;
    opacity: 0.5;
    top: 0;
    left: 0;
  }
</style>
