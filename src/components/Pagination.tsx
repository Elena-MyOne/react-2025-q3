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
            ? 'bg-gray-600 opacity-35 border border-black text-white'
            : 'bg-gray-500 cursor-pointer hover:bg-green-500 border border-black text-white'
        }`}
      >
        Previous
      </button>
      <div className="px-4 py-2 rounded" data-testid="page">
        {currentPage}
      </div>
      {pages !== currentPage && (
        <>
          <div className="">...</div>
          <button
            onClick={handleLastPage}
            className="px-4 py-2 rounded duration-300 bg-gray-500 cursor-pointer hover:bg-green-500 border border-black text-white"
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
            ? 'bg-gray-600 opacity-35 border border-black text-white'
            : 'bg-gray-500 cursor-pointer hover:bg-green-400 border border-black text-white'
        }`}
      >
        Next
      </button>
    </div>
  );
}
