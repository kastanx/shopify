import Container from "@/components/layout/Container";
import BackButton from "@/components/navigation/BackButton";
import Pagination from "@/components/ui/Pagination";
import { GetCollectionQuery, GetCollectionSeoQuery } from "@/gql/graphql";
import { GET_COLLECTION, GET_COLLECTION_SEO } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import { formatPrice } from "@/util/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type SearchParams = Promise<{
  page?: string;
}>;

type Params = Promise<{
  handle: string;
}>;

const PRODUCTS_PER_PAGE = 4;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { handle } = await props.params;
  const { data } = await getClient().query<GetCollectionSeoQuery>({
    query: GET_COLLECTION_SEO,
    variables: {
      handle: handle,
    },
  });

  if (!data.collection) return notFound();

  return {
    title: `${
      data.collection.seo.title || data.collection.title
    } | Magexo Shop`,
    description: data.collection.seo.description || data.collection.description,
  };
}

export default async function CollectionPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { handle } = await props.params;
  const { page } = await props.searchParams;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

  let cursor = null;
  if (currentPage > 1) {
    const { data: cursorData } = await getClient().query<GetCollectionQuery>({
      query: GET_COLLECTION,
      variables: {
        handle: handle,
        first: skip,
      },
    });

    if (cursorData.collection?.products.edges.length) {
      cursor = cursorData.collection.products.edges[skip - 1].cursor;
    }
  }

  const { data } = await getClient().query<GetCollectionQuery>({
    query: GET_COLLECTION,
    variables: {
      handle: handle,
      first: PRODUCTS_PER_PAGE,
      after: cursor,
    },
  });

  if (!data.collection) return notFound();

  return (
    <Container>
      <div className="py-16 min-h-screen flex flex-col">
        <BackButton />
        <h1
          className="text-4xl font-bold text-gray-800 mb-4"
          data-pw="collection-title"
        >
          {data.collection.title}
        </h1>
        {data.collection.description && (
          <p className="text-gray-600 mb-8" data-pw="collection-description">
            {data.collection.description}
          </p>
        )}

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4"
          data-pw="products-grid"
        >
          {data.collection.products.edges.map(({ node: product }) => (
            <Link
              href={`/products/${product.handle}`}
              key={product.id}
              className="group"
              data-pw="product-card"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 shadow-sm">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-pw="product-image"
                  />
                )}
                {product.compareAtPriceRange?.minVariantPrice.amount >
                  product.priceRange.minVariantPrice.amount && (
                  <div
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium"
                    data-pw="sale-badge"
                  >
                    Sale
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h2
                  className="text-lg font-medium text-gray-800 group-hover:text-gray-600"
                  data-pw="product-title"
                >
                  {product.title}
                </h2>
                <p
                  className="text-gray-500 line-clamp-2 mt-1"
                  data-pw="product-description"
                >
                  {product.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <p
                    className="text-lg font-medium text-gray-800"
                    data-pw="product-price"
                  >
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                  {product.compareAtPriceRange?.minVariantPrice.amount >
                    product.priceRange.minVariantPrice.amount && (
                    <p
                      className="text-sm text-gray-500 line-through"
                      data-pw="product-compare-price"
                    >
                      {formatPrice(
                        product.compareAtPriceRange.minVariantPrice.amount,
                        product.compareAtPriceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-2">
          <Pagination
            currentPage={currentPage}
            hasNextPage={data.collection.products.pageInfo.hasNextPage}
            baseUrl={`/categories/${handle}`}
          />
        </div>
      </div>
    </Container>
  );
}
