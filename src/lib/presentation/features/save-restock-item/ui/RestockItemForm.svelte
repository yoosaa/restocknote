<script lang="ts">
	import { RESTOCK_CATEGORIES } from '$lib/domain/restock-item/models/restock-category';
	import type { RestockItemDraft } from '$lib/domain/restock-item/models/restock-item-draft';
	import {
		RESTOCK_STATUSES,
		type RestockStatus
	} from '$lib/domain/restock-item/models/restock-status';
	import { RESTOCK_STATUS_LABELS } from '$lib/presentation/entities/restock-item/ui/restock-status-presentation';

	interface Props {
		draft: RestockItemDraft;
		formId?: string;
		errorMessage?: string;
		onSubmit: (event: SubmitEvent) => void | Promise<void>;
	}

	let {
		draft,
		formId = 'restock-item-form',
		errorMessage = '',
		onSubmit
	}: Props = $props();
</script>

<form id={formId} class="space-y-6" onsubmit={onSubmit}>
	{#if errorMessage}
		<div class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
			{errorMessage}
		</div>
	{/if}

	<div class="space-y-2">
		<label for="productName" class="block text-sm font-medium text-gray-900">
			商品名 <span class="text-red-500">*</span></label
		>
		<input
			id="productName"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.productName}
			placeholder="例: コーヒー豆 ブラジル産"
		/>
	</div>

	<div class="space-y-2">
		<label for="category" class="block text-sm font-medium text-gray-900"> カテゴリ </label>
		<select
			id="category"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.category}
		>
			{#each RESTOCK_CATEGORIES as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	<div class="space-y-2">
		<label for="quantity" class="block text-sm font-medium text-gray-900"> 数量メモ </label>
		<input
			id="quantity"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.quantity}
			placeholder="例: 2kg、500個入り × 2箱"
		/>
	</div>

	<div class="space-y-2">
		<label for="requiredDate" class="block text-sm font-medium text-gray-900"> 必要日 </label>
		<input
			id="requiredDate"
			type="date"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.requiredDate}
		/>
	</div>

	<div class="space-y-2">
		<label for="status" class="block text-sm font-medium text-gray-900"> 状態 </label>
		<select
			id="status"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.status}
		>
			{#each RESTOCK_STATUSES as status}
				<option value={status}>{RESTOCK_STATUS_LABELS[status as RestockStatus]}</option>
			{/each}
		</select>
	</div>

	<div class="space-y-2">
		<label for="notes" class="block text-sm font-medium text-gray-900"> 補足メモ </label>
		<input
			id="notes"
			class="w-full rounded-md border border-gray-300 px-3 py-2"
			bind:value={draft.notes}
			placeholder="補充に関する補足情報"
		/>
	</div>
</form>
