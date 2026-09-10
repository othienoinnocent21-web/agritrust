import Button from "./Button";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  disabled = false,
  siblingCount = 1,
  showPagesCount = true,
  className = "",
}) => {
  if (totalPages <= 0) return null;

  const getVisiblePages = () => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const hasLeftSeparator = currentPage > siblingCount + 2;
    const hasRightSeparator = currentPage < totalPages - siblingCount - 1;

    pages.push(1);

    if (hasLeftSeparator) {
      pages.push(-1);
    }

    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (hasRightSeparator) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePage = (page) => {
    if (page >= 1 && page <= totalPages && !disabled && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrev || disabled}
        onClick={() => handlePage(currentPage - 1)}
      >
        Previous
      </Button>

      {visiblePages.map((page, index) => {
        if (page === -1) {
          return (
            <span
              key={`separator-${index}`}
              className="px-2 text-sm text-muted"
              aria-hidden="true"
            >
              …
            </span>
          );
        }
        return (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "ghost"}
            size="sm"
            disabled={disabled}
            onClick={() => handlePage(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext || disabled}
        onClick={() => handlePage(currentPage + 1)}
      >
        Next
      </Button>

      {showPagesCount && (
        <span className="text-sm text-muted">
          Page {currentPage} of {totalPages}
        </span>
      )}
    </div>
  );
};

export default Pagination;
