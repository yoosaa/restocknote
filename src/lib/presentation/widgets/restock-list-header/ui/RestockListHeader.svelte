<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		createHref?: string;
	}

	let {
		title = 'Restocknote',
		description = '補充メモ一覧',
		createHref = '/restocks/new'
	}: Props = $props();
</script>

<header class="mb-8 flex items-start justify-between gap-4">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
		<p class="text-gray-600">{description}</p>
	</div>

	<a
		href={createHref}
		class="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
	>
		新規追加
	</a>
</header>
