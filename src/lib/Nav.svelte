
<script>
    import {link} from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'

</script>

    <nav>
        <ul>
        <li class="nav-item">
            <a href="/" use:link use:active>Home</a>
        </li>
        <li class="nav-item">
            <a href="/about" use:link use:active>About</a>
        </li>
        <li class="nav-item">
            <a href="/Tips" use:link use:active>Tips To Climb</a>
        </li>

        </ul>
    </nav>

<style>

    :global(.nav-item a.active) {
    /* color: red!important; */
    border-bottom: 2px solid #fff;
   
    }   
    :global(.nav-item a:hover){
    /* color: green!important; */
    }

    nav {
        background-color: #333;
        color: #fff;
        padding: 1rem;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    nav ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    nav li {
        margin-right: 1rem;
    }

    nav a {
        color: #fff;
        text-decoration: none;
    }





</style>
