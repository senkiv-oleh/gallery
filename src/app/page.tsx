import { Suspense } from 'react';
import { getPhotos } from '@/services/unsplash';
import Gallery from '@/components/Gallery/Gallery';
import Pagination from '@/components/Pagination/Pagination';

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

async function HomeFeed({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const { photos, totalPages } = await getPhotos(currentPage, 12);

  return (
    <>
      <Gallery
        initialPhotos={photos}
        title="Editorial"
        subtitle="The best free high-resolution photos brought to you by the world's most generous community of photographers."
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/"
      />
    </>
  );
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <main>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '64px 20px', color: '#767676' }}>
            <p>Loading gallery...</p>
          </div>
        }
      >
        <HomeFeed searchParams={searchParams} />
      </Suspense>
    </main>
  );
}