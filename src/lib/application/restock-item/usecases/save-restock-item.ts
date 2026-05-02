import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';
import type { RestockItemRepository } from '../ports/restock-item-repository';

export const saveRestockItem = async (
	repository: RestockItemRepository,
	item: RestockItem
): Promise<void> => {
	await repository.save(item);
};
