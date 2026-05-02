import type { RestockItemId } from '$lib/domain/restock-item/models/restock-item';
import { getNextRestockStatus } from '$lib/domain/restock-item/services/restock-status-transition';
import type { RestockItemRepository } from '../ports/restock-item-repository';

export const updateRestockStatus = async (
	repository: RestockItemRepository,
	id: RestockItemId
): Promise<void> => {
	const item = await repository.findById(id);

	if (!item) {
		throw new Error('Restock item not found');
	}

	const updatedItem = {
		...item,
		status: getNextRestockStatus(item.status)
	};

	await repository.save(updatedItem);
};
