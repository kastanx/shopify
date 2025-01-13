/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetCollections {\n    collections(first: 10) {\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          image {\n            url\n            altText\n          }\n          products(first: 1) {\n            edges {\n              node {\n                featuredImage {\n                  url\n                  altText\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCollectionsDocument,
    "\n  query GetCollection($handle: String!, $first: Int!, $after: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            title\n            handle\n            description\n            featuredImage {\n              url\n              altText\n            }\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            compareAtPriceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n": types.GetCollectionDocument,
    "\n  query GetCollectionSEO($handle: String!) {\n    collection(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n": types.GetCollectionSeoDocument,
    "\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      descriptionHtml\n      totalInventory\n      images(first: 10) {\n        edges {\n          node {\n            id\n            url\n            altText\n          }\n        }\n      }\n      variants(first: 100) {\n        edges {\n          node {\n            id\n            title\n            price {\n              amount\n              currencyCode\n            }\n            compareAtPrice {\n              amount\n              currencyCode\n            }\n            quantityAvailable\n          }\n        }\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  query GetProductSEO($handle: String!) {\n    product(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n": types.GetProductSeoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollections {\n    collections(first: 10) {\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          image {\n            url\n            altText\n          }\n          products(first: 1) {\n            edges {\n              node {\n                featuredImage {\n                  url\n                  altText\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollections {\n    collections(first: 10) {\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          image {\n            url\n            altText\n          }\n          products(first: 1) {\n            edges {\n              node {\n                featuredImage {\n                  url\n                  altText\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollection($handle: String!, $first: Int!, $after: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            title\n            handle\n            description\n            featuredImage {\n              url\n              altText\n            }\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            compareAtPriceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollection($handle: String!, $first: Int!, $after: String) {\n    collection(handle: $handle) {\n      id\n      title\n      description\n      products(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            title\n            handle\n            description\n            featuredImage {\n              url\n              altText\n            }\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            compareAtPriceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollectionSEO($handle: String!) {\n    collection(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetCollectionSEO($handle: String!) {\n    collection(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      descriptionHtml\n      totalInventory\n      images(first: 10) {\n        edges {\n          node {\n            id\n            url\n            altText\n          }\n        }\n      }\n      variants(first: 100) {\n        edges {\n          node {\n            id\n            title\n            price {\n              amount\n              currencyCode\n            }\n            compareAtPrice {\n              amount\n              currencyCode\n            }\n            quantityAvailable\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      descriptionHtml\n      totalInventory\n      images(first: 10) {\n        edges {\n          node {\n            id\n            url\n            altText\n          }\n        }\n      }\n      variants(first: 100) {\n        edges {\n          node {\n            id\n            title\n            price {\n              amount\n              currencyCode\n            }\n            compareAtPrice {\n              amount\n              currencyCode\n            }\n            quantityAvailable\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductSEO($handle: String!) {\n    product(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetProductSEO($handle: String!) {\n    product(handle: $handle) {\n      id\n      seo {\n        description\n        title\n      }\n      description\n      title\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;