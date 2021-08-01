import supabase from '$lib/database';
export async function post(request) {
	const cart = JSON.parse(request.body);

	if (cart.id) {
		// Cart exists, go ahead and add item to existing cart table
		console.log('--------------------------------');
		console.log('Updating cart in supabase...');
		console.log('--------------------------------');

		// Rewite this code to update cart table, not add a new column
		const { data, error } = await supabase.from('cart').update([{ cart: cart }]);
		console.log(data, error);

		return {
			statusCode: 200,
			body: JSON.stringify(data)
		};
	} else {
		// create cart table with request params
		console.log('--------------------------------');
		console.log('Creating cart table in supabase');
		console.log('--------------------------------');

		return {
			statusCode: 200,
			body: JSON.stringify('no cart data')
		};
	}
}
