<script>
  import { getContext } from 'svelte';

  import Jumbotron from './components/Jumbotron.svelte';
  import About from './components/About.svelte';
  import Faydev from './components/Faydev.svelte';
  import FaydenSpace from './components/FaydenSpace.svelte';
  import Contact from './components/Contact.svelte';
  import FooterObjects from './components/FooterObjects.svelte';

  const { data } = $props();
  const footerHeight = getContext('footer-height');

  let jumbotronOffsetHeight = $state();
  let contactOffsetHeight = $state();
</script>

<main class="main">
  <Jumbotron bind:jumbotronOffsetHeight />
  <About />
  <Faydev projects={data.projects} {jumbotronOffsetHeight} />
  <FaydenSpace arts={data.arts} />
  <Contact bind:contactOffsetHeight />
  <FooterObjects
    {contactOffsetHeight}
    footerOffsetHeight={footerHeight.offset}
  />
</main>

<style>
  .main {
    display: contents;
  }
</style>
