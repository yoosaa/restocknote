import type { RestockItemRepository } from '$lib/application/restock-item/ports/restock-item-repository';
import type { RestockItem, RestockItemId } from '$lib/domain/restock-item/models/restock-item';
import { mockRestockItems } from '../seeds/mock-restock-items';

const STORAGE_KEY = 'restocknote:items';

const paramItems = (raw: string | null): RestockItem[] => {
	if (!raw) {
		return mockRestockItems;
	}

	try {
		const parsed = JSON.parse(raw) as RestockItem[];
		return Array.isArray(parsed) ? parsed : mockRestockItems;
	} catch {
		return mockRestockItems;
	}
};

const readItems = (): RestockItem[] => {
	return paramItems(window.localStorage.getItem(STORAGE_KEY));
};

const writeItems = (items: RestockItem[]): void => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export class LocalStorageRestockItemRepository implements RestockItemRepository {
	async list(): Promise<RestockItem[]> {
		const items = readItems();

		if (window.localStorage.getItem(STORAGE_KEY) === null) {
			writeItems(items);
		}

		return items;
	}

	async findById(id: RestockItemId): Promise<RestockItem | null> {
		const items = readItems();
		return items.find((current) => current.id === id) ?? null;
	}

	async save(item: RestockItem): Promise<void> {
		const items = readItems();
		const index = items.findIndex((current) => current.id === item.id);

		if (index >= 0) {
			items[index] = item;
		} else {
			items.push(item);
		}

		writeItems(items);
	}

	async delete(id: RestockItemId): Promise<void> {
		const items = readItems().filter((item) => item.id === id);
		writeItems(items);
	}
}
