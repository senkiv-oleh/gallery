import Link from 'next/link';
import Image from 'next/image';
import { getPhotoById } from '@/services/unsplash';
import styles from './PhotoDetail.module.scss';

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const photo = await getPhotoById(id);

  if (!photo) {
    return (
      <main className={styles.container}>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>Photo not found</h2>
          <p style={{ color: '#767676', marginTop: '8px' }}>
            The requested photo could not be located.
          </p>
          <Link href="/" className={styles.backLink} style={{ marginTop: '20px' }}>
            &larr; Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(photo.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          &larr; Back to Gallery
        </Link>
      </div>

      <header className={styles.authorCard}>
        <div className={styles.authorInfo}>
          <Image
            src={photo.user.profile_image.large || photo.user.profile_image.medium}
            alt={photo.user.name}
            width={48}
            height={48}
            className={styles.avatar}
          />
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>{photo.user.name}</span>
            <span className={styles.authorUsername}>@{photo.user.username}</span>
            {photo.user.bio && <span className={styles.authorBio}>{photo.user.bio}</span>}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.likeBtn} aria-label={`${photo.likes} likes`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{photo.likes.toLocaleString()}</span>
          </div>

          <a
            href={photo.urls.full || photo.urls.raw}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            <span>Download</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </header>

      <div
        className={styles.imageFrame}
        style={{ backgroundColor: photo.color || '#eeeeee' }}
      >
        <Image
          src={photo.urls.regular || photo.urls.full || photo.urls.small}
          alt={photo.alt_description || photo.description || 'Unsplash photo'}
          width={photo.width || 1200}
          height={photo.height || 800}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className={styles.mainImage}
          priority
        />
      </div>

      <section className={styles.detailsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Views</span>
          <span className={styles.statValue}>
            {photo.views ? photo.views.toLocaleString() : '-'}
          </span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Downloads</span>
          <span className={styles.statValue}>
            {photo.downloads ? photo.downloads.toLocaleString() : '-'}
          </span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Dimensions</span>
          <span className={styles.statValue}>
            {photo.width} &times; {photo.height}
          </span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Published</span>
          <span className={styles.statValue}>{formattedDate}</span>
        </div>

        {photo.exif?.model && (
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Camera</span>
            <span className={styles.statValue}>
              {photo.exif.make ? `${photo.exif.make} ` : ''}
              {photo.exif.model}
            </span>
          </div>
        )}
      </section>

      {(photo.description || photo.location?.name) && (
        <div className={styles.descriptionBox}>
          {photo.description && (
            <p className={styles.descriptionText}>{photo.description}</p>
          )}
          {photo.location?.name && (
            <span className={styles.locationText}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {photo.location.name}
            </span>
          )}
        </div>
      )}

      {photo.tags && photo.tags.length > 0 && (
        <section className={styles.tagsSection}>
          <h2 className={styles.tagsTitle}>Related tags</h2>
          <ul className={styles.tagsList}>
            {photo.tags.map((tag) => (
              <li key={tag.title}>
                <Link
                  href={`/tag/${encodeURIComponent(tag.title.toLowerCase())}`}
                  className={styles.tagPill}
                >
                  #{tag.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
