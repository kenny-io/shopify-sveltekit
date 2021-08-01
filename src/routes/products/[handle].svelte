<script context="module">
	import { writable } from 'svelte/store';
	import { getProductDetails } from '../../store';

	export async function load(ctx) {
		let handle = ctx.page.params.handle;
		const product = await getProductDetails(handle);
		const productImage = product.images.edges[0].node.src;
		const productVariants = product.variants.edges.map((v) => v.node);
		const routeParams = writable(ctx.page.params);
		return { props: { product, productImage, productVariants, routeParams } };
	}
</script>

<script>
	import supabase from '$lib/database';
	import { onMount } from 'svelte';
	export let product;
	export let productImage;
	export let productVariants;
	let quantity = 0;
	let cartId;
	// @ts-ignore
	let selectedProduct = productVariants[0].id;

	onMount(async () => {
		let { data: cart, error } = await supabase.from('cart').select('cart');

		if (cart.length < 1) {
			cartId = null;
		} else {
			cartId = cart[0].cart.id;
		}
	});

	const addToCart = async (e) => {
		e.preventDefault();
		try {
			// Send request to create cart to Shopify
			// if cart doesnt exist, a new cart will be created with the selected item

			const addToCartResponse = await fetch('/api/add-to-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId,
					itemId: selectedProduct,
					quantity: quantity
				})
			});
			const cart = await addToCartResponse.json();
			console.log(cart);

			// if the cart was successfully created on Shopify,
			// Add it to the database. But first, check if that cart is already in the DB

			if (cart.id === cartId) {
				console.log('cart Exists, updating cart...');
				// if the cart is alraeady in the DB, just update it
				try {
					const addCartToDB = await fetch('/api/update-supabase-cart', {
						method: 'POST',
						body: JSON.stringify(cart)
					});
					const supabaseresponse = await addCartToDB.json();
					console.log(supabaseresponse);
					return supabaseresponse;
				} catch (e) {
					console.log(e);
				}
			} else {
				console.log("Cart doesn't exist, creating one ...");
				// if it's not in the DB, add it
				try {
					const addCartToDB = await fetch('/api/post-to-supabase', {
						method: 'POST',
						body: JSON.stringify(cart)
					});
					const supabaseresponse = await addCartToDB.json();
					console.log(supabaseresponse);
					return supabaseresponse;
				} catch (e) {
					console.log(e);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	function price(itemPrice) {
		const amount = Number(itemPrice).toFixed(2);
		return amount + ' ' + 'USD';
	}
</script>

<main class="product-page">
	<article>
		<section class="product-page-content">
			<div>
				<img class="product-page-image" src={productImage} alt={product.handle} />
			</div>
			<div>
				<h1>{product.title}</h1>
				<p>{product.description}</p>
				<form>
					{#if productVariants.length > 1}
						<div class="product-page-price-list">
							{#each productVariants as { id, quantityAvailable, title, priceV2 }}
								<div class="product-page-price">
									<input
										{id}
										bind:value={selectedProduct}
										type="radio"
										name="merchandiseId"
										disabled={quantityAvailable === 0}
									/>
									<label for={id}>
										{title} - {price(priceV2.amount)}
										{#if quantityAvailable > 10}
											<span>(10+ left)</span>
										{:else if quantityAvailable > 0}
											<span>
												(Only {quantityAvailable} left)
											</span>
										{:else}
											<span> (Bummer. It's sold out!) </span>
										{/if}
									</label>
								</div>
							{/each}
						</div>
					{:else}
						<div class="product-page-price is-solo">
							{price(productVariants[0].priceV2.amount)}
							{#if productVariants[0].quantityAvailable > 10}
								<span> (10+ left) </span>
							{:else if productVariants[0].quantityAvailable > 0}
								<span>
									(Only {productVariants[0].quantityAvailable} left)
								</span>
							{:else}
								<span> (Bummer. It's sold out!) </span>
							{/if}
						</div>
					{/if}
					<div class="product-page-quantity-row">
						<input
							class="product-page-quantity-input"
							type="number"
							name="quantity"
							min="1"
							max={productVariants[0].quantityAvailable}
							bind:value={quantity}
						/>

						<button type="submit" on:click|preventDefault={addToCart} class="button purchase">
							Add to Cart
						</button>
					</div>
				</form>
			</div>
		</section>
	</article>
</main>
