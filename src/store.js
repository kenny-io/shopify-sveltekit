import { writable } from 'svelte/store';
import { postToShopify } from './utils/postToShopify';

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
	const response = await fetch(
		'https://netlify-developer-starter.myshopify.com/api/unstable/graphql.json',
		{
			method: 'post',
			headers: {
				'Content-Type': 'application/graphql',
				'X-Shopify-Storefront-Access-Token': 'e9c4dbd5f540d4cefcb2518f7648caf9'
			},
			body: query
		}
	)
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
		console.log('--------------------------------');
		console.log('Retrieving product details...');
		console.log('--------------------------------');
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
		// console.log(shopifyResponse.productByHandle);
		return shopifyResponse.productByHandle;
	} catch (error) {
		console.log(error);
	}
};
