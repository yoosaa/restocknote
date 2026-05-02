<script lang="ts">
	import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';
	import RestockItemCard from '$lib/presentation/entities/restock-item/ui/RestockItemCard.svelte';

	interface Props {
		items: RestockItem[];
		onChangeStatus: (id: string) => void | Promise<void>;
		onResetFilters: () => void;
	}

	let { items, onChangeStatus, onResetFilters }: Props = $props();
</script>

<section>
	<div class="mb-4 flex items-center justify-between gap-4">
		<h2 class="text-lg font-semibold text-gray-900">
			補充メモ一覧
			<span class="ml-2 text-sm font-normal text-gray-600">({items.length}件)</span>
		</h2>
	</div>

	{#if items.length === 0}
		<div class="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
			<p class="text-gray-500">該当する補充メモがありません</p>

			<button
				type="button"
				class="mt-4 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				onclick={onResetFilters}
			>
				フィルターをリセット
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each items as item (item.id)}
				<RestockItemCard {item} {onChangeStatus} />
			{/each}
		</div>
	{/if}
</section>
