import type { RestockItem } from '$lib/domain/restock-item/models/restock-item';

export const mockRestockItems: RestockItem[] = [
	{
		id: '1',
		productName: 'コーヒー豆 ブラジル産',
		category: '食材',
		quantity: '2kg',
		notes: '前回の残りが少なくなってきたため、早めに発注したい',
		requiredDate: '2026-04-20',
		status: 'needed'
	},
	{
		id: '2',
		productName: '紙コップ (M)',
		category: '消耗品',
		quantity: '500個入り × 2箱',
		notes: '先週発注済み、配送予定は4/22',
		requiredDate: '2026-04-22',
		status: 'ordered'
	},
	{
		id: '3',
		productName: 'アロマオイル ラベンダー',
		category: 'その他',
		quantity: '100ml × 3本',
		notes: '補充完了。在庫棚に格納済み',
		requiredDate: '2026-04-15',
		status: 'stocked'
	},
	{
		id: '4',
		productName: 'ミルクフォーマー',
		category: '備品',
		quantity: '1台',
		notes: '既存のものがまだ使えるため今回は見送り',
		requiredDate: '2026-04-18',
		status: 'skipped'
	},
	{
		id: '5',
		productName: 'ペーパータオル',
		category: '消耗品',
		quantity: '10ロール',
		notes: '在庫が残り2ロールになった',
		requiredDate: '2026-04-25',
		status: 'needed'
	},
	{
		id: '6',
		productName: 'ミネラルウォーター',
		category: '飲料',
		quantity: '24本入り × 3箱',
		notes: '定期購入分、月末に発注予定',
		requiredDate: '2026-04-30',
		status: 'needed'
	}
];
