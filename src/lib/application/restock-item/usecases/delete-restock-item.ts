import type { RestockItemId } from '$lib/domain/restock-item/models/restock-item';
import type { RestockItemRepository } from '../ports/restock-item-repository';

export const deleteRestockItem = async (
	repository: RestockItemRepository,
	id: RestockItemId
): Promise<void> => {
	await repository.delete(id);
};
