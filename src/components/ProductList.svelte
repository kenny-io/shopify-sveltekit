<script>
	import ProductCard from '../components/ProductCard.svelte';
	import { products, getProducts } from '../store';
	getProducts();
</script>

<div class="product-grid">
	{#each $products as product}
		<ProductCard product={product.node} />
	{/each}
</div>
