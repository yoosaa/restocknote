import { getRestockItem } from '$lib/application/restock-item/usecases/get-restock-item';
import { LocalStorageRestockItemRepository } from '$lib/infrastructure/restock-item/repositories/local-storage-restock-item-repository';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const repository = new LocalStorageRestockItemRepository();
	const item = await getRestockItem(repository, params.id);

	if (!item) throw error(404, 'Restock item not found');

	return {
		item
	};
};
