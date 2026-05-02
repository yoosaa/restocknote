import type { RestockItemDraft } from '$lib/domain/restock-item/models/restock-item-draft';

export const validateRestockItemDraft = (draft: RestockItemDraft): string | null => {
	if (!draft.productName.trim()) {
		return '商品名は必須です';
	}

	if (!draft.requiredDate) {
		return '必要日を入力してください';
	}

	return null;
};
