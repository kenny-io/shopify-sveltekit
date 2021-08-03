<script>
	import { onMount } from 'svelte';
	import { getCart } from '../utils/get-cart';

	let subtotal;
	let currency;
	let total;
	let tax;
	onMount(async () => {
		const data = await getCart();
		subtotal = data.estimatedCost.subtotalAmount.amount;
		currency = data.estimatedCost.subtotalAmount.currencyCode;
		total = data.estimatedCost.totalAmount.amount;
		tax = data.estimatedCost.totalTaxAmount.amount || 0;
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
