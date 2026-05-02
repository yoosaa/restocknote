<script lang="ts">
	import type { PageProps } from './$types';
	import { LocalStorageRestockItemRepository } from '$lib/infrastructure/restock-item/repositories/local-storage-restock-item-repository';
	import { updateRestockStatus } from '$lib/application/restock-item/usecases/update-restock-status';
	import { invalidateAll } from '$app/navigation';
	import {
		countRestockItemsByStatus,
		createDefaultRestockFilters,
		filterRestockItems
	} from '$lib/presentation/features/filter-restock-items/model/restock-filters';
	import RestockListHeader from '$lib/presentation/widgets/restock-list-header/ui/RestockListHeader.svelte';
	import RestockFiltersPanel from '$lib/presentation/widgets/restock-filters-panel/ui/RestockFiltersPanel.svelte';
	import RestockListGrid from '$lib/presentation/widgets/restock-list-grid/ui/RestockListGrid.svelte';

	let { data }: PageProps = $props();

	const repository = new LocalStorageRestockItemRepository();

	let filters = $state(createDefaultRestockFilters());
	const filteredItems = $derived(filterRestockItems(data.items, filters));
	const statusCounts = $derived(countRestockItemsByStatus(data.items));

	const resetFilters = () => {
		filters = createDefaultRestockFilters();
	};

	const handleChangeStatus = async (id: string) => {
		await updateRestockStatus(repository, id);
		await invalidateAll();
	};
</script>

<svelte:head>
	<title>Restocknote | 補充メモ一覧</title>
	<meta
		name="description"
		content="小規模店舗や個人運営向けの入荷・補充メモツール。補充必要、発注済み、補充完了、見送りの状態を軽く管理できます。"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-6xl px-4 py-8">
		<RestockListHeader />

		<RestockFiltersPanel {filters} {statusCounts} onReset={resetFilters} />

		<RestockListGrid
			items={filteredItems}
			onChangeStatus={handleChangeStatus}
			onResetFilters={resetFilters}
		/>
	</div>
</div>
