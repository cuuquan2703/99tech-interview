interface PaginationControlProps {
    totalPages: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    currentPage: number;
    isPageLoading: boolean;
    handlePageChange: (page: number) => void;
}

function PaginationControl({ totalPages, goToPreviousPage, goToNextPage, currentPage, isPageLoading, handlePageChange }: PaginationControlProps) {
  return (
    <>
            {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
              <div className="flex items-center space-x-2">
                {/* Previous Page */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isPageLoading}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-green-500 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default PaginationControl