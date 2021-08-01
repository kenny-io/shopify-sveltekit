<script context="module">
	export function load(ctx) {
		const router = ctx;
		return { props: { router } };
	}
</script>

<script>
	import ProductList from '../components/ProductList.svelte';
	import '../../src/app.css';
	export let router;
	// @ts-ignore
	console.log(router);
</script>

<svelte:head>
	<title>Shoperoni</title>
</svelte:head>

<main>
	<ProductList />
</main>
