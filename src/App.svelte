<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { apiData } from "./store.js";
  import Router, { link, location } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Nav from "./lib/Nav.svelte";
  import Footer from "./lib/Footer.svelte";

  let savestore = false;

  $: if (savestore && $apiData) {
    window.sessionStorage.setItem("store", JSON.stringify($apiData));
  }

  onMount(async () => {
    let ses = window.sessionStorage.getItem("store");
    if (ses) {
      console.log("sob-- ~ loading ses", ses);
      $apiData = JSON.parse(ses);
    }
    savestore = true;
  });

  onDestroy(async () => {
    window.sessionStorage.removeItem("store");
  });
</script>

<Nav />

<Router {routes} />

<Footer />
