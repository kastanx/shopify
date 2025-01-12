interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  hasNextPage,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {currentPage > 1 && (
        <a
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Previous
        </a>
      )}
      <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
        Page {currentPage}
      </span>
      {hasNextPage && (
        <a
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Next
        </a>
      )}
    </div>
  );
}
