<script>
  import { getContext } from 'svelte';
  import { setPageData } from '$lib/states/pageData.svelte';
  import Jumbotron from './components/page/Jumbotron.svelte';
  import Navbar from './components/page/Navbar.svelte';
  import About from './components/page/About.svelte';
  import Faydev from './components/page/Faydev.svelte';
  import FaydenSpace from './components/page/FaydenSpace.svelte';
  import Contact from './components/page/Contact.svelte';
  import FooterObjects from './components/page/FooterObjects.svelte';

  const { data } = $props();

  setPageData({
    additionalKeywords: ['portfolio', 'projects', 'arts', 'contact'],
  });

  const getFooterOffsetHeight = getContext('footer-offset-height');

  let jumbotron = $state();
  let about = $state();
  let faydev = $state();
  let faydenSpace = $state();
  let contact = $state();

  const linkedSections = $derived([
    {
      name: 'About',
      url: '#about',
      offsetTop: about?.getOffsetTop(),
    },
    {
      name: 'Projects',
      url: '#projects',
      offsetTop: faydev?.getOffsetTop(),
    },
    {
      name: 'Arts',
      url: '#arts',
      offsetTop: faydenSpace?.getOffsetTop(),
    },
    {
      name: 'Contact',
      url: '#contact',
      offsetTop: contact?.getOffsetTop(),
    },
  ]);
</script>

<main class="main">
  <Jumbotron bind:this={jumbotron} />
  <Navbar {linkedSections} />
  <About bind:this={about} />
  <Faydev
    bind:this={faydev}
    projects={data.projects}
    jumbotronOffsetHeight={jumbotron?.getOffsetHeight()}
  />
  <FaydenSpace bind:this={faydenSpace} arts={data.arts} />
  <Contact bind:this={contact} />
  <FooterObjects
    contactOffsetHeight={contact?.getOffsetHeight()}
    footerOffsetHeight={getFooterOffsetHeight()}
  />
</main>

<style>
  .main {
    display: contents;
  }
</style>
