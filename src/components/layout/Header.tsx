import { GetCollectionsQuery } from "@/generated/graphql";
import { GET_COLLECTIONS } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import Link from "next/link";
import Dropdown from "../ui/Dropdown";

async function Header() {
  const { data } = await getClient().query<GetCollectionsQuery>({
    query: GET_COLLECTIONS,
  });

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800"
            data-pw="home-link"
          >
            Magexo Shop
          </Link>

          <Dropdown trigger="Categories">
            <div className="py-1">
              {data.collections.edges.map(({ node: collection }) => (
                <Link
                  key={collection.id}
                  href={`/categories/${collection.handle}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  data-pw="collection-link"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
