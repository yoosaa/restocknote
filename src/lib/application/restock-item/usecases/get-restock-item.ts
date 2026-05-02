import type { RestockItem, RestockItemId } from '$lib/domain/restock-item/models/restock-item';
import type { RestockItemRepository } from '../ports/restock-item-repository';

export const getRestockItem = (
	repository: RestockItemRepository,
	id: RestockItemId
): Promise<RestockItem | null> => {
	return repository.findById(id);
};
