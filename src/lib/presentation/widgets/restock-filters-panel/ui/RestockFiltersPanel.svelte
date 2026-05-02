<script lang="ts">
	import { RESTOCK_CATEGORIES } from '$lib/domain/restock-item/models/restock-category';
	import {
		RESTOCK_STATUSES,
		type RestockStatus
	} from '$lib/domain/restock-item/models/restock-status';
	import {
		RESTOCK_STATUS_BADGE_CLASSES,
		RESTOCK_STATUS_LABELS
	} from '$lib/presentation/entities/restock-item/ui/restock-status-presentation';
	import type { RestockFilters } from '$lib/presentation/features/filter-restock-items/model/restock-filters';

	interface StatusCounts {
		all: number;
		needed: number;
		ordered: number;
		stocked: number;
		skipped: number;
	}

	interface Props {
		filters: RestockFilters;
		statusCounts: StatusCounts;
		onReset: () => void;
	}

	let { filters, statusCounts, onReset }: Props = $props();
</script>

<div class="mb-8 space-y-4">
	<section class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
		<div class="mb-3">
			<p class="text-sm font-medium text-gray-700">状態で絞り込み</p>
		</div>

		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				class={`inline-flex rounded-md border px-2 py-1 text-xs font-medium transition ${
					filters.status === 'all'
						? 'border-gray-900 bg-gray-900 text-white'
						: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
				}`}
				onclick={() => (filters.status = 'all')}
			>
				すべて ({statusCounts.all})
			</button>

			{#each RESTOCK_STATUSES as status}
				<button
					type="button"
					class={`inline-flex rounded-md border px-2 py-1 text-xs font-medium transition ${
						filters.status === status
							? 'border-gray-900 bg-gray-900 text-white'
							: `${RESTOCK_STATUS_BADGE_CLASSES[status]} hover:opacity-80`
					}`}
					onclick={() => (filters.status = status)}
				>
					{RESTOCK_STATUS_LABELS[status]} ({statusCounts[status]})
				</button>
			{/each}
		</div>
	</section>

	<section class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
		<div class="mb-2 flex items-center justify-between gap-3">
			<label for="category-filter" class="text-sm font-medium text-gray-700">
				カテゴリで絞り込み
			</label>

			<button type="button" class="text-sm text-gray-500 hover:text-gray-800" onclick={onReset}>
				リセット
			</button>
		</div>

		<select
			id="category-filter"
			class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 md:w-64"
			bind:value={filters.category}
		>
			<option value="all">すべてのカテゴリ</option>
			{#each RESTOCK_CATEGORIES as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</section>
</div>
