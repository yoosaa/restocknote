<script lang="ts">
	import {
		createEmptyRestockItemDraft,
		createRestockItemDraftFormItem,
		toRestockItem
	} from '$lib/domain/restock-item/models/restock-item-draft';
	import { LocalStorageRestockItemRepository } from '$lib/infrastructure/restock-item/repositories/local-storage-restock-item-repository';
	import type { PageProps } from './$types';
	import { saveRestockItem } from '$lib/application/restock-item/usecases/save-restock-item';
	import { goto } from '$app/navigation';
	import { deleteRestockItem } from '$lib/application/restock-item/usecases/delete-restock-item';
	import RestockItemForm from '$lib/presentation/features/save-restock-item/ui/RestockItemForm.svelte';
	import RestockEditorPanel from '$lib/presentation/widgets/restock-editor-panel/ui/RestockEditorPanel.svelte';
	import DeleteRestockItemButton from '$lib/presentation/features/delete-restock-item/ui/DeleteRestockItemButton.svelte';
	import { validateRestockItemDraft } from '$lib/presentation/features/delete-restock-item/model/validate-restock-item-draft';

	let { data }: PageProps = $props();

	const repository = new LocalStorageRestockItemRepository();
	const formId = 'edit-restock-item-form';

	let draft = $state(createEmptyRestockItemDraft());
	let isSaving = $state(false);
	let isDeleting = $state(false);
	let errorMessage = $state('');
	let itemId = $derived(data.item.id);

	$effect(() => {
		draft = createRestockItemDraftFormItem(data.item);
	});

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const validationError = validateRestockItemDraft(draft);
		errorMessage = validationError ?? '';

		if (validationError) return;

		isSaving = true;

		try {
			const item = toRestockItem(itemId, draft);
			await saveRestockItem(repository, item);
			await goto('/restocks');
		} catch (error) {
			console.error(error);
			errorMessage = '保存に失敗しました';
		} finally {
			isSaving = false;
		}
	};

	const handleDelete = async () => {
		const ok = window.confirm('この補充メモを削除してもよろしいですか？');

		if (!ok) {
			return;
		}

		errorMessage = '';
		isDeleting = true;

		try {
			await deleteRestockItem(repository, data.item.id);
			await goto('/restocks');
		} catch (error) {
			console.error(error);
			errorMessage = '削除に失敗しました';
		} finally {
			isDeleting = false;
		}
	};
</script>

<svelte:head>
	<title>補充メモ編集 | Restocknote</title>
	<meta
		name="description"
		content="Restocknote の補充メモを編集します。状態更新や削除もここから行えます。"
	/>
</svelte:head>

<RestockEditorPanel title="補充メモ編集">
	{#snippet children()}
		<RestockItemForm {draft} {formId} {errorMessage} onSubmit={handleSubmit} />

		<div class="flex items-center justify-start gap-4 pt-4">
			<button
				type="submit"
				form={formId}
				class="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
				disabled={isSaving || isDeleting}
			>
				{#if isSaving}
					保存中...
				{:else}
					更新する
				{/if}
			</button>

			<DeleteRestockItemButton {isDeleting} disabled={isSaving} onDelete={handleDelete} />
		</div>
	{/snippet}
</RestockEditorPanel>
