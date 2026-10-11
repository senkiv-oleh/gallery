import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  queryParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '',
  queryParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        params.set(key, val);
      }
    });
    params.set('page', page.toString());
    const queryString = params.toString();
    const cleanBase = basePath || '';
    return queryString ? `${cleanBase}?${queryString}` : `${cleanBase}?page=${page}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className={styles.pagination}>
      {hasPrev ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className={`${styles.pageButton} ${styles.prevNext}`}
        >
          &larr; Previous
        </Link>
      ) : (
        <span className={`${styles.pageButton} ${styles.prevNext} ${styles.disabled}`}>
          &larr; Previous
        </span>
      )}

      <div className={styles.pageNumbers}>
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className={styles.dots}>
                &hellip;
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return isActive ? (
            <span
              key={pageNum}
              className={`${styles.pageButton} ${styles.active}`}
              aria-current="page"
            >
              {pageNum}
            </span>
          ) : (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={styles.pageButton}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {hasNext ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className={`${styles.pageButton} ${styles.prevNext}`}
        >
          Next &rarr;
        </Link>
      ) : (
        <span className={`${styles.pageButton} ${styles.prevNext} ${styles.disabled}`}>
          Next &rarr;
        </span>
      )}
    </nav>
  );
}
