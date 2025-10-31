<script>
  import { getContext } from 'svelte';

  import Jumbotron from './components/Jumbotron.svelte';
  import Navbar from './components/Navbar.svelte';
  import About from './components/About.svelte';
  import Faydev from './components/Faydev.svelte';
  import FaydenSpace from './components/FaydenSpace.svelte';
  import Contact from './components/Contact.svelte';
  import FooterObjects from './components/FooterObjects.svelte';

  const { data } = $props();

  const footerHeight = getContext('footer-height');

  const linkedSectionsComponent = $state(new Array(5).fill(undefined));

  const linkedSections = $derived([
    {
      name: 'About',
      url: '#about',
      offsetTop: linkedSectionsComponent[0]?.getOffsetTop(),
    },
    {
      name: 'Projects',
      url: '#projects',
      offsetTop: linkedSectionsComponent[1]?.getOffsetTop(),
    },
    {
      name: 'Arts',
      url: '#arts',
      offsetTop: linkedSectionsComponent[2]?.getOffsetTop(),
    },
    {
      name: 'Contact',
      url: '#contact',
      offsetTop: linkedSectionsComponent[3]?.getOffsetTop(),
    },
  ]);

  let jumbotronOffsetHeight = $state();
  let contactOffsetHeight = $state();
</script>

<main class="main">
  <Jumbotron bind:jumbotronOffsetHeight />
  <Navbar {linkedSections} />
  <About bind:this={linkedSectionsComponent[0]} />
  <Faydev
    bind:this={linkedSectionsComponent[1]}
    projects={data.projects}
    {jumbotronOffsetHeight}
  />
  <FaydenSpace bind:this={linkedSectionsComponent[2]} arts={data.arts} />
  <Contact bind:this={linkedSectionsComponent[3]} bind:contactOffsetHeight />
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
