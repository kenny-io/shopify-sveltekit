import { createCartWithItem } from './utils/createCartWithItem';
import { addItemToCart } from './utils/addItemToCart';

export async function post(request) {
	// console.log(request.body);

	const { cartId, itemId, quantity } = JSON.parse(request.body);
	const itemQuantity = Number(quantity);

	console.log(cartId, itemId, itemQuantity);

	if (cartId) {
		console.log('--------------------------------');
		console.log('Adding item to existing cart...');
		console.log('--------------------------------');

		const shopifyResponse = await addItemToCart({
			cartId,
			itemId,
			// @ts-ignore
			itemQuantity
		});
		console.log(shopifyResponse);
		return {
			statusCode: 200,
			body: JSON.stringify(shopifyResponse.cartLinesAdd.cart)
		};
	} else {
		console.log('--------------------------------');
		console.log('Creating new cart with item...');
		console.log('--------------------------------');
		const createCartResponse = await createCartWithItem({
			itemId,
			// @ts-ignore
			itemQuantity
		});

		console.log(createCartResponse);

		return {
			statusCode: 200,
			body: JSON.stringify(createCartResponse.cartCreate.cart)
		};
	}
}
