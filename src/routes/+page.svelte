<script>
  import Jumbotron from './components/Jumbotron.svelte';
  import About from './components/About.svelte';
  import Faydev from './components/Faydev.svelte';

  const { data } = $props();

  let jumbotronOffsetHeight = $state();
</script>

<Jumbotron bind:jumbotronOffsetHeight />
<About />
<Faydev projects={data.projects} jumbotronOffsetHeight />
