import Container from "@/components/layout/Container";
import { GetCollectionsQuery } from "@/generated/graphql";
import { GET_COLLECTIONS } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Collections | Magexo Shop",
  description: "Discover our curated collections of premium products",
};

export default async function Home() {
  const { data } = await getClient().query<GetCollectionsQuery>({
    query: GET_COLLECTIONS,
  });

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Collections
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.collections.edges.map(({ node: collection }) => (
            <Link
              href={`/categories/${collection.handle}`}
              key={collection.id}
              className="group"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : collection.products.edges[0]?.node.featuredImage ? (
                  <Image
                    src={collection.products.edges[0].node.featuredImage.url}
                    alt={
                      collection.products.edges[0].node.featuredImage.altText ||
                      collection.title
                    }
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-white/90 text-sm line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
