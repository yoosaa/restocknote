export const RESTOCK_STATUSES = ['needed', 'ordered', 'stocked', 'skipped'] as const;

export type RestockStatus = (typeof RESTOCK_STATUSES)[number];
