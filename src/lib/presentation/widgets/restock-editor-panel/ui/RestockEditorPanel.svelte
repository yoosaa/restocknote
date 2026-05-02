<script lang="ts">
	interface Props {
		title: string;
		backHref?: string;
		children: import('svelte').Snippet;
	}

	let { title, backHref = '/restocks', children }: Props = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-3xl px-4 py-8">
		<header class="mb-8">
			<a href={backHref} class="text-sm text-gray-600 hover:text-gray-900">← 一覧に戻る</a>
			<h1 class="mt-4 text-3xl font-bold text-gray-900">{title}</h1>
		</header>

		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			{@render children()}
		</div>
	</div>
</div>
