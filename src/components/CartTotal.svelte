<script>
	import { onMount } from 'svelte';
	import supabase from '$lib/database';
	let cart;
	let subtotal;
	let currency;
	let total;
	let tax;

	onMount(async () => {
		// get all the cart details we need from Supabase
		try {
			const { data, error } = await supabase.from('cart').select('cart');
			cart = data[0].cart;
			subtotal = cart.estimatedCost.subtotalAmount.amount;
			currency = cart.estimatedCost.subtotalAmount.currencyCode;
			total = cart.estimatedCost.totalAmount.amount;
			tax = cart.estimatedCost.totalTaxAmount.amount || 0;
		} catch (e) {
			console.log(e);
		}
	});
</script>

<section class="cart-total">
	<div class="cart-total-content">
		<div class="cart-total-column">
			<p>
				<strong>Subtotal:</strong>
			</p>
			<p>Shipping:</p>
			<p>Tax:</p>
			<p>Total:</p>
		</div>
		<div class="cart-total-column">
			<p>
				<strong>{currency} {subtotal}</strong>
			</p>
			<p>Free Shipping</p>
			<p>{currency} {tax}</p>
			<p>{currency} {total}</p>
		</div>
	</div>
</section>
