"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 4; // Show max 4 numbered pages

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than or equal to maxVisible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust to always show 4 pages when possible
            if (currentPage <= 3) {
                end = Math.min(totalPages - 1, 3);
            } else if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - 2);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 py-8 px-4">
            {/* Previous Button */}
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-sm
                        bg-white border border-warm-gray-300 text-text-dark
                        hover:border-primary hover:text-primary hover:shadow-md
                        transition-all duration-200 ease-in-out
                        active:scale-95"
                    aria-label="Previous page"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-warm-gray-500 font-semibold"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`
                                min-w-[40px] h-[40px] px-3 rounded-lg font-bold text-sm
                                transition-all duration-200 ease-in-out
                                active:scale-95
                                ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                    : 'bg-white border border-warm-gray-300 text-text-dark hover:border-primary hover:text-primary hover:shadow-md'
                                }
                            `}
                            aria-label={`Page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-sm
                    transition-all duration-200 ease-in-out
                    ${currentPage >= totalPages
                        ? 'bg-warm-gray-100 border border-warm-gray-200 text-warm-gray-400 cursor-not-allowed'
                        : 'bg-white border border-warm-gray-300 text-text-dark hover:border-primary hover:text-primary hover:shadow-md active:scale-95'
                    }`}
                aria-label="Next page"
                aria-disabled={currentPage >= totalPages}
            >
                <span className="hidden sm:inline">Next</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
}
