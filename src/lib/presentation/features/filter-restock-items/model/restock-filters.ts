import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';
import type { RestockStatus } from '$lib/domain/restock-item/models/restock-status';

export interface RestockFilters {
	status: RestockStatus | 'all';
	category: string | 'all';
}

export const createDefaultRestockFilters = (): RestockFilters => {
	return {
		status: 'all',
		category: 'all'
	};
};

export const filterRestockItems = (
	items: RestockItem[],
	filters: RestockFilters
): RestockItem[] => {
	return items.filter((item) => {
		const matchesStatus = filters.status === 'all' || item.status === filters.status;

		const matchesCategory = filters.category === 'all' || item.category === filters.category;

		return matchesStatus && matchesCategory;
	});
};

export const countRestockItemsByStatus = (items: RestockItem[]) => {
	return {
		all: items.length,
		needed: items.filter((item) => item.status === 'needed').length,
		ordered: items.filter((item) => item.status === 'ordered').length,
		stocked: items.filter((item) => item.status === 'stocked').length,
		skipped: items.filter((item) => item.status === 'skipped').length
	};
};
