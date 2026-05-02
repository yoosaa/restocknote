import type { RestockStatus } from '$lib/domain/restock-item/models/restock-status';

export const RESTOCK_STATUS_LABELS: Record<RestockStatus, string> = {
	needed: '補充必要',
	ordered: '発注済み',
	stocked: '補充完了',
	skipped: '見送り'
};

export const RESTOCK_STATUS_BADGE_CLASSES: Record<RestockStatus, string> = {
	needed: 'bg-red-100 text-red-700 border-red-200',
	ordered: 'bg-blue-100 text-blue-700 border-blue-200',
	stocked: 'bg-green-100 text-green-700 border-green-200',
	skipped: 'bg-gray-100 text-gray-700 border-gray-200'
};

export const getRestockStatusLabel = (status: RestockStatus): string => {
	return RESTOCK_STATUS_LABELS[status];
};
