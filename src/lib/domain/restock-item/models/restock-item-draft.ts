import type { RestockItem } from './restock-item';
import type { RestockStatus } from './restock-status';

export interface RestockItemDraft {
	productName: string;
	category: string;
	quantity: string;
	notes: string;
	requiredDate: string;
	status: RestockStatus;
}

export const createEmptyRestockItemDraft = (): RestockItemDraft => {
	return {
		productName: '',
		category: 'その他',
		quantity: '',
		notes: '',
		requiredDate: '',
		status: 'needed'
	};
};

export const createRestockItemDraftFormItem = (item: RestockItem): RestockItemDraft => {
	return {
		productName: item.productName,
		category: item.category,
		quantity: item.quantity,
		notes: item.notes,
		requiredDate: item.requiredDate,
		status: item.status
	};
};

export const toRestockItem = (id: string, draft: RestockItemDraft): RestockItem => {
	return {
		id,
		productName: draft.productName.trim(),
		category: draft.category.trim(),
		quantity: draft.quantity.trim(),
		notes: draft.notes.trim(),
		requiredDate: draft.requiredDate,
		status: draft.status
	};
};
