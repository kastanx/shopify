import Container from "@/components/layout/Container";
import BackButton from "@/components/navigation/BackButton";
import { GetProductQuery, GetProductSeoQuery } from "@/gql/graphql";
import { GET_PRODUCT, GET_PRODUCT_SEO } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import { formatPrice } from "@/util/formatPrice";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{
  handle: string;
}>;

export async function generateMetadata(props: { params: Params }) {
  const { handle } = await props.params;
  const { data } = await getClient().query<GetProductSeoQuery>({
    query: GET_PRODUCT_SEO,
    variables: {
      handle: handle,
    },
  });

  if (!data.product) return notFound();

  return {
    title: `${data.product.seo.title || data.product.title} | Magexo Shop`,
    description: data.product.seo.description || data.product.description,
  };
}

export default async function ProductPage(props: { params: Params }) {
  const { handle } = await props.params;
  const { data } = await getClient().query<GetProductQuery>({
    query: GET_PRODUCT,
    variables: {
      handle: handle,
    },
  });

  if (!data.product) return notFound();

  return (
    <Container>
      <div className="py-16">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4" data-pw="product-images">
            {data.product.images.edges.map(({ node: image }) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 shadow-sm"
              >
                <Image
                  src={image.url}
                  alt={image.altText || data?.product?.title || ""}
                  fill
                  className="object-cover"
                  loading="lazy"
                  data-pw="product-image"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="sticky top-8">
            <h1
              className="text-4xl font-bold text-gray-800 mb-4"
              data-pw="product-title"
            >
              {data.product.title}
            </h1>
            <div
              className="prose prose-gray prose-sm mb-8"
              dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
              data-pw="product-description"
            />

            <div className="border-t border-gray-200 pt-8">
              <h2
                className="text-xl font-semibold text-gray-800 mb-4"
                data-pw="variants-title"
              >
                Variants
              </h2>
              <div className="space-y-4" data-pw="variants-list">
                {data.product.variants.edges.map(({ node: variant }) => (
                  <div
                    key={variant.id}
                    className="flex justify-between items-center p-4 rounded-lg bg-gray-50"
                    data-pw="variant-item"
                  >
                    <div>
                      <h3
                        className="font-medium text-gray-800"
                        data-pw="variant-title"
                      >
                        {variant.title}
                      </h3>
                      <p
                        className="text-sm text-gray-500"
                        data-pw="variant-stock"
                      >
                        Stock: {variant.quantityAvailable}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-medium text-gray-800"
                        data-pw="variant-price"
                      >
                        {formatPrice(
                          variant.price.amount,
                          variant.price.currencyCode
                        )}
                      </p>
                      {variant.compareAtPrice &&
                        parseFloat(variant.compareAtPrice.amount) >
                          parseFloat(variant.price.amount) && (
                          <>
                            <p
                              className="text-sm text-gray-500 line-through"
                              data-pw="variant-compare-price"
                            >
                              {formatPrice(
                                variant.compareAtPrice.amount,
                                variant.compareAtPrice.currencyCode
                              )}
                            </p>
                            <span
                              className="ml-2 inline-block bg-red-500 text-white px-2 py-0.5 text-xs rounded-md"
                              data-pw="variant-discount"
                            >
                              Save{" "}
                              {Math.round(
                                ((parseFloat(variant.compareAtPrice.amount) -
                                  parseFloat(variant.price.amount)) /
                                  parseFloat(variant.compareAtPrice.amount)) *
                                  100
                              )}
                              %
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-lg text-gray-800">
                Total Inventory:{" "}
                <span className="font-medium">
                  {data.product.totalInventory}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
