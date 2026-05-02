import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';
import type { RestockItemRepository } from '../ports/restock-item-repository';

export const listRestockItems = async (
	repository: RestockItemRepository
): Promise<RestockItem[]> => {
	return repository.list();
};
