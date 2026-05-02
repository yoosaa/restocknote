import type { RestockItem, RestockItemId } from '$lib/domain/restock-item/models/restock-item';

export interface RestockItemRepository {
	list(): Promise<RestockItem[]>;
	findById(id: RestockItemId): Promise<RestockItem | null>;
	save(item: RestockItem): Promise<void>;
	delete(id: RestockItemId): Promise<void>;
}
