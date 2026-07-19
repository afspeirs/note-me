<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import NotesSearch from '$lib/components/NotesSearch.svelte';
  import NotesSearchResults from '$lib/components/NotesSearchResults.svelte';
</script>

<Card
  as="nav"
  class="relative flex flex-col flex-1 overflow-hidden"
  aria-label="sidebar folders"
>
  <div class="p-card-gap">
    <NotesSearch />
  </div>

  <div class="overflow-auto px-card-gap">
    <ul>
      <NotesSearchResults />
    </ul>
  </div>
</Card>
