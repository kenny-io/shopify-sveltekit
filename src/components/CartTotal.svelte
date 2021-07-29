<script>
	import { onMount } from 'svelte';
	let cart;
	let subtotal;
	let currency;
	let total;
	let tax;

	onMount(() => {
		// get all the cart details we need from localStorage
		cart = JSON.parse(localStorage.getItem('cart'));
		subtotal = cart.estimatedCost.subtotalAmount.amount;
		currency = cart.estimatedCost.subtotalAmount.currencyCode;
		total = cart.estimatedCost.totalAmount.amount;
		tax = cart.estimatedCost.totalTaxAmount.amount || 0;
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
