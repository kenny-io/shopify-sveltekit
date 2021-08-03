<script>
	import { onMount } from 'svelte';
	import { getCart } from '../utils/get-cart';
	let count;

	onMount(async () => {
		const data = await getCart();
		count = data.lines.edges.length;
	});
</script>

<section>
	<header class="app-header">
		<h1>Shoperoni</h1>
		<nav class="main-nav">
			<ul>
				<li class="main-nav-item">
					<a href="/">All</a>
				</li>
				<li class="main-nav-item">
					<a href="?type=cheese">Cheeses</a>
				</li>
				<li class="main-nav-item">
					<a href="?type=meat">Meats</a>
				</li>
				<li class="main-nav-item">
					<a href="?type=boards">Boards</a>
				</li>
				<li class="main-nav-item">
					{#if count}
						<div class="cart-size">{count}</div>
						<a href="/cart">Cart</a>
					{/if}
				</li>
			</ul>
		</nav>
	</header>
</section>
