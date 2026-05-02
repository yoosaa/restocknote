<script lang="ts">
	interface Props {
		isDeleting?: boolean;
		disabled?: boolean;
		onDelete: () => void | Promise<void>;
	}

	let { isDeleting = false, disabled = false, onDelete }: Props = $props();
</script>

<button
	type="button"
	class="inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
	disabled={disabled || isDeleting}
	onclick={onDelete}
>
	{#if isDeleting}
		削除中...
	{:else}
		削除する
	{/if}
</button>
