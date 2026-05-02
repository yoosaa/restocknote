<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveRestockItem } from '$lib/application/restock-item/usecases/save-restock-item';
	import {
		createEmptyRestockItemDraft,
		toRestockItem
	} from '$lib/domain/restock-item/models/restock-item-draft';
	import { createRestockItemId } from '$lib/domain/restock-item/services/create-restock-item-id';
	import { LocalStorageRestockItemRepository } from '$lib/infrastructure/restock-item/repositories/local-storage-restock-item-repository';
	import { validateRestockItemDraft } from '$lib/presentation/features/delete-restock-item/model/validate-restock-item-draft';
	import RestockItemForm from '$lib/presentation/features/save-restock-item/ui/RestockItemForm.svelte';
	import RestockEditorPanel from '$lib/presentation/widgets/restock-editor-panel/ui/RestockEditorPanel.svelte';

	const repository = new LocalStorageRestockItemRepository();
	const formId = 'new-restock-item-form';

	let draft = $state(createEmptyRestockItemDraft());
	let isSaving = $state(false);
	let errorMessage = $state('');

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const validationError = validateRestockItemDraft(draft);
		errorMessage = validationError ?? '';

		if (validationError) return;

		isSaving = true;

		try {
			const item = toRestockItem(createRestockItemId(), draft);
			await saveRestockItem(repository, item);
			await goto('/restocks');
		} catch (error) {
			console.error(error);
			errorMessage = '保存に失敗しました';
		} finally {
			isSaving = false;
		}
	};
</script>

<svelte:head>
	<title>新規補充メモ | Restocknote</title>
	<meta
		name="description"
		content="Restocknote で新しい補充メモを作成します。商品名、カテゴリ、必要日、数量メモ、補足メモを登録できます。"
	/>
</svelte:head>

<RestockEditorPanel title="新規補充メモ">
	{#snippet children()}
		<RestockItemForm {draft} {formId} {errorMessage} onSubmit={handleSubmit} />

		<div class="flex justify-start pt-4">
			<button
				type="submit"
				form={formId}
				class="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
				disabled={isSaving}
			>
				{#if isSaving}
					保存中...
				{:else}
					保存する
				{/if}
			</button>
		</div>
	{/snippet}
</RestockEditorPanel>
