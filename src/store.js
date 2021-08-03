import { writable } from 'svelte/store';
import { postToShopify } from '../src/routes/api/utils/postToShopify';

export const products = writable([]);
export const productDetails = writable([]);

export const getProducts = async () => {
	const query = `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            handle
            description
            title
            totalInventory
            productType
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  price
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      }
    }`;
	// @ts-ignore
	const response = await fetch(import.meta.env.VITE_SHOPIFY_API_ENDPOINT, {
		method: 'post',
		headers: {
			'Content-Type': 'application/graphql',
			'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN
		},
		body: query
	})
		.then((res) => res.json())
		.then((response) => {
			return response.data.products.edges;
		});
	products.set(response);
	return response;
};

// product details
export const getProductDetails = async (handle) => {
	try {
		const shopifyResponse = await postToShopify({
			query: ` 
        query getProduct($handle: String!) {
          productByHandle(handle: $handle) {
            id
            handle
            description
            title
            totalInventory
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      `,
			variables: {
				handle: handle
			}
		});

		productDetails.set(shopifyResponse.productByHandle);
		return shopifyResponse.productByHandle;
	} catch (error) {
		console.log(error);
	}
};
