import Home from "./routes/Home.svelte";
import Details from "./routes/Details.svelte";
import NotFound from "./routes/NotFound.svelte";
import About from "./routes/About.svelte";
import Tips from "./routes/Tips.svelte";

export const routes = {
  // Exact path
  "/": Home,
  "/details/:name": Details,
  "/about": About,
  "/tips": Tips,
  "*": NotFound,

  // Wildcard parameter
  // '/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // "*": NotFound,
};
