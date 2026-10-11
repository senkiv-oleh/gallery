import { Suspense } from 'react';
import { searchPhotos } from '@/services/unsplash';
import Gallery from '@/components/Gallery/Gallery';
import Pagination from '@/components/Pagination/Pagination';

interface SearchPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

async function SearchFeed({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) {
  const params = await searchParams;
  const query = (params.query || '').trim();
  const currentPage = Math.max(1, Number(params.page) || 1);

  if (!query) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#555' }}>
        <h2>Please enter a search term</h2>
        <p style={{ marginTop: '8px', color: '#767676' }}>
          Use the search bar above to find stunning high-resolution photos.
        </p>
      </div>
    );
  }

  const { photos, total, totalPages } = await searchPhotos(query, currentPage, 12);

  return (
    <>
      <Gallery
        initialPhotos={photos}
        title={`"${query}"`}
        subtitle={`${total.toLocaleString()} photos found`}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/search"
        queryParams={{ query }}
      />
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <main>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '64px 20px', color: '#767676' }}>
            <p>Searching photos...</p>
          </div>
        }
      >
        <SearchFeed searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
