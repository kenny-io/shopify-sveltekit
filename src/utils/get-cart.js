import supabase from '$lib/database';
export const getCart = async () => {
	let cart;
	try {
		const { data, error } = await supabase.from('cart').select('cart');
		cart = data[0].cart;
		return cart;
	} catch (e) {
		console.log(e);
	}

	return cart;
};
