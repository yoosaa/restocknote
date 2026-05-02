<script lang="ts">
	import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';
	import { getNextRestockStatus } from '$lib/domain/restock-item/services/restock-status-transition';
	import {
		getRestockStatusLabel,
		RESTOCK_STATUS_BADGE_CLASSES,
		RESTOCK_STATUS_LABELS
	} from './restock-status-presentation';

	interface Props {
		item: RestockItem;
		onChangeStatus?: (id: string) => void | Promise<void>;
	}

	let { item, onChangeStatus }: Props = $props();

	let isUpdating = $state(false);

	const nextStatus = $derived(getNextRestockStatus(item.status));
	const nextStatusLabel = $derived(getRestockStatusLabel(nextStatus));

	const handleChangeStatus = async () => {
		if (!onChangeStatus) {
			return;
		}

		isUpdating = true;

		try {
			await onChangeStatus(item.id);
		} finally {
			isUpdating = false;
		}
	};
</script>

<article class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
	<div class="mb-3 flex items-start justify-between gap-3">
		<div class="min-w-0 flex-1">
			<h2 class="mb-1 text-lg font-semibold text-gray-900">{item.productName}</h2>
			<p class="text-sm text-gray-600">{item.category}</p>
		</div>

		<span
			class={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${RESTOCK_STATUS_BADGE_CLASSES[item.status]}`}
		>
			{RESTOCK_STATUS_LABELS[item.status]}
		</span>
	</div>

	<dl class="space-y-2 text-sm text-gray-700">
		<div class="flex gap-2">
			<dt class="font-medium">数量:</dt>
			<dd>{item.quantity || '-'}</dd>
		</div>

		<div class="flex gap-2">
			<dt class="font-medium">必要日:</dt>
			<dd>{item.requiredDate || '-'}</dd>
		</div>

		<div class="flex gap-2">
			<dt class="font-medium">メモ:</dt>
			<dd class="line-clamp-2">{item.notes || '-'}</dd>
		</div>

		<div class="mt-4 border-t border-gray-100 pt-3">
			<a
				href={`/restocks/${item.id}/edit`}
				class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium to-gray-700 hover:bg-gray-50"
				>編集</a
			>

			<button
				class="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
				type="button"
				onclick={handleChangeStatus}
				disabled={isUpdating}
			>
				{#if isUpdating}
					更新中...
				{:else}
					→ {nextStatusLabel}
				{/if}
			</button>
		</div>
	</dl>
</article>
