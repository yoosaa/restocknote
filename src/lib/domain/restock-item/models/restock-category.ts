export const RESTOCK_CATEGORIES = ['食材', '飲料', '消耗品', '備品', 'その他'] as const;

export type RestockCategory = (typeof RESTOCK_CATEGORIES)[number];
