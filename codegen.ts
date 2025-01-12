import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const SHOPIFY_STOREFRONT_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!SHOPIFY_STOREFRONT_URL || !SHOPIFY_STOREFRONT_TOKEN) {
  throw new Error(
    "Missing required environment variables NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN"
  );
}

const config: CodegenConfig = {
  schema: {
    [SHOPIFY_STOREFRONT_URL]: {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
    },
  },
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
