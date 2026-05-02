import type { RestockStatus } from '../models/restock-status';

const NEXT_STATUS_MAP: Record<RestockStatus, RestockStatus> = {
	needed: 'ordered',
	ordered: 'stocked',
	stocked: 'needed',
	skipped: 'needed'
};

export const getNextRestockStatus = (currentStatus: RestockStatus): RestockStatus => {
	return NEXT_STATUS_MAP[currentStatus];
};
