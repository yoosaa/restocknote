import { listRestockItems } from '$lib/application/restock-item/usecases/list-restock-items';
import { LocalStorageRestockItemRepository } from '$lib/infrastructure/restock-item/repositories/local-storage-restock-item-repository';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
	const repository = new LocalStorageRestockItemRepository();
	const items = await listRestockItems(repository);

	return {
		items
	};
};
