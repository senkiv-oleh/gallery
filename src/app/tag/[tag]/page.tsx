import { Suspense } from 'react';
import { getPhotosByTag } from '@/services/unsplash';
import Gallery from '@/components/Gallery/Gallery';
import Pagination from '@/components/Pagination/Pagination';

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function TagFeed({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const search = await searchParams;
  const decodedTag = decodeURIComponent(tag);
  const currentPage = Math.max(1, Number(search.page) || 1);

  const { photos, total, totalPages } = await getPhotosByTag(decodedTag, currentPage, 12);

  return (
    <>
      <Gallery
        initialPhotos={photos}
        title={`#${decodedTag}`}
        subtitle={`Collection of ${total > 0 ? total.toLocaleString() : photos.length} high-resolution photos tagged with #${decodedTag}`}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/tag/${encodeURIComponent(decodedTag)}`}
      />
    </>
  );
}

export default function TagPage({ params, searchParams }: TagPageProps) {
  return (
    <main>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '64px 20px', color: '#767676' }}>
            <p>Loading tag collection...</p>
          </div>
        }
      >
        <TagFeed params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
