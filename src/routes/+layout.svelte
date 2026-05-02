<script lang="ts">
	import AppFooter from '$lib/presentation/widgets/app-footer/ui/AppFooter.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<div class="min-h-screen">
		{@render children()}
	</div>

	<AppFooter />
</div>
