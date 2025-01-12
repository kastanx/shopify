import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export function getClient() {
  const SHOPIFY_STOREFRONT_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
  const SHOPIFY_STOREFRONT_TOKEN =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  if (!SHOPIFY_STOREFRONT_URL || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error(
      "Missing required environment variables NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN"
    );
  }

  const httpLink = new HttpLink({
    uri: SHOPIFY_STOREFRONT_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
  });

  if (!client) {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: httpLink,
    });
  }

  return client;
}
