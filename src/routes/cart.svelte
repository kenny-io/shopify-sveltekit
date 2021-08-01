<script>
	// @ts-nocheck

	import CartTable from '../components/CartTable.svelte';
	import CartTotal from '../components/CartTotal.svelte';
	import { onMount } from 'svelte';
	import supabase from '$lib/database';

	let cart;
	let cartItems = [];
	onMount(async () => {
		// get all the cart details we need from Suapabase
		try {
			const { data, error } = await supabase.from('cart').select('cart');
			cart = data[0].cart;
			cartItems = data[0].cart.lines.edges;
		} catch (e) {
			console.log(e);
		}
	});
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
