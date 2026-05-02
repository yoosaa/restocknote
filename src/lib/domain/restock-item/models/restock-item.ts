import type { RestockStatus } from './restock-status';

export type RestockItemId = string;

export interface RestockItem {
	id: RestockItemId;
	productName: string;
	category: string;
	quantity: string;
	notes: string;
	requiredDate: string;
	status: RestockStatus;
}
