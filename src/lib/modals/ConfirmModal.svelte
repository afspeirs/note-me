<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { modal } from '$lib/context/modal.svelte';

  let isLoading = $state(false);

  // Get all data from the modal store
  const onConfirm = $derived(modal.current.onConfirm || (() => {}));
  const title = $derived(modal.current.data?.title || 'Confirm');
  const message = $derived(modal.current.data?.message || 'Are you sure you want to continue?');
  const description = $derived(modal.current.data?.description);
  const confirmText = $derived(modal.current.data?.confirmText || 'Confirm');
  const cancelText = $derived(modal.current.data?.cancelText || 'Cancel');
  const confirmClass = $derived(modal.current.data?.confirmClass || 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white');

  function onClose() {
    modal.close();
  }

  async function handleConfirm() {
    isLoading = true;
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirm action failed:', error); // eslint-disable-line no-console
    } finally {
      isLoading = false;
    }
  }
</script>

<Modal {title} {onClose} size="sm">
  <div class="p-card-gap space-y-4">
    <div class="px-2 space-y-4">
      <p class="text-gray-700 dark:text-gray-300">
        {message}
      </p>

      {#if description}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      {/if}
    </div>

    <div class="flex gap-3 justify-end">
      <Button
        onclick={onClose}
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        onclick={handleConfirm}
        disabled={isLoading}
        class={confirmClass}
      >
        {isLoading ? 'Loading...' : confirmText}
      </Button>
    </div>
  </div>
</Modal>
