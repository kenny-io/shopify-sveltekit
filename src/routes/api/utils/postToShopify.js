// const fetch = require("node-fetch");

export const postToShopify = async ({ query, variables }) => {
	try {
		const result = await fetch(
			'https://netlify-developer-starter.myshopify.com/api/unstable/graphql.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token': 'e9c4dbd5f540d4cefcb2518f7648caf9'
				},
				body: JSON.stringify({ query, variables })
			}
		).then((res) => res.json());

		if (result.errors) {
			console.log({ errors: result.errors });
		} else if (!result || !result.data) {
			console.log({ result });
			return 'No results found.';
		}

		return result.data;
	} catch (error) {
		console.log(error);
	}
};