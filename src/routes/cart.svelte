<script context="module">
	// @ts-nocheck
	export async function load(ctx) {
		let cart;
		let cartItems = [];
		try {
			const { data, error } = await supabase.from('cart').select('cart');
			cart = data[0].cart;
			cartItems = data[0].cart.lines.edges;
		} catch (e) {
			console.log(e);
		}
		return { props: { cartItems } };
	}
</script>

<script>
	import CartTable from '../components/CartTable.svelte';
	import CartTotal from '../components/CartTotal.svelte';
	import supabase from '$lib/database';
	export let cartItems;
</script>

<section>
	<main class="cart-page">
		<article class="cart-page-content">
			<h1>Your Cart</h1>
			{#if cartItems.length > 0}
				<CartTable />
				<CartTotal />
			{:else}
				<section v-else>
					<p class="cart-page-message">Your cart is empty, fill it up!</p>
					<a href="/" class="cart-page-button is-dark"> Back to Products </a>
				</section>
			{/if}
		</article>
	</main>
</section>
