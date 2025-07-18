interface PaginationProps {
  currentPage: number;
  pages: number;
  prevPage: boolean;
  nextPage: boolean;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  pages,
  prevPage,
  nextPage,
  setCurrentPage,
}: PaginationProps) {
  const handlePrevious = () => {
    if (prevPage) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (nextPage) setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(pages);
  };

  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <button
        onClick={handlePrevious}
        disabled={!prevPage}
        className={`px-4 py-2 rounded duration-300 ${
          !prevPage
            ? 'bg-gray-300 opacity-35 border border-black'
            : 'bg-gray-300 cursor-pointer hover:bg-green-500 border border-black'
        }`}
      >
        Previous
      </button>
      <div className="px-4 py-2 rounded">{currentPage}</div>
      {pages !== currentPage && (
        <>
          <div className="">...</div>
          <button
            onClick={handleLastPage}
            className="px-4 py-2 rounded duration-300 bg-gray-300 cursor-pointer hover:bg-green-500 border border-black"
          >
            {pages}
          </button>
        </>
      )}
      <button
        onClick={handleNext}
        disabled={!nextPage}
        className={`px-4 py-2 rounded duration-300 ${
          !nextPage
            ? 'bg-gray-200 opacity-35 border border-black'
            : 'bg-gray-200 cursor-pointer hover:bg-green-400 border border-black'
        }`}
      >
        Next
      </button>
    </div>
  );
}
