'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnsplashImage } from '@/types/unsplash';
import styles from './Gallery.module.scss';

interface GalleryProps {
  initialPhotos?: UnsplashImage[];
  title?: string;
  subtitle?: string;
}

export default function Gallery({
  initialPhotos = [],
  title,
  subtitle,
}: GalleryProps) {
  const [columns, setColumns] = useState<3 | 5>(3);

  return (
    <section className={styles.galleryContainer}>
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h1 className={styles.sectionTitle}>{title}</h1>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.controlsBar}>
        <div className={styles.photosCount}>
          <span>{initialPhotos.length > 0 ? `${initialPhotos.length} photos` : ''}</span>
        </div>

        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={`${styles.toggleButton} ${columns === 3 ? styles.active : ''}`}
            onClick={() => setColumns(3)}
            aria-pressed={columns === 3}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="4" width="5" height="16" rx="1" />
              <rect x="9.5" y="4" width="5" height="16" rx="1" />
              <rect x="17" y="4" width="5" height="16" rx="1" />
            </svg>
            <span>3 Columns</span>
          </button>

          <button
            type="button"
            className={`${styles.toggleButton} ${columns === 5 ? styles.active : ''}`}
            onClick={() => setColumns(5)}
            aria-pressed={columns === 5}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1" y="4" width="3.2" height="16" rx="0.8" />
              <rect x="5.7" y="4" width="3.2" height="16" rx="0.8" />
              <rect x="10.4" y="4" width="3.2" height="16" rx="0.8" />
              <rect x="15.1" y="4" width="3.2" height="16" rx="0.8" />
              <rect x="19.8" y="4" width="3.2" height="16" rx="0.8" />
            </svg>
            <span>5 Columns</span>
          </button>
        </div>
      </div>

      {initialPhotos.length === 0 ? (
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <h3>No photos found</h3>
          <p>Try searching for a different keyword or browse our popular categories above.</p>
        </div>
      ) : (
        <div className={`${styles.masonryGrid} ${styles[`cols-${columns}`]}`}>
          {initialPhotos.map((photo) => (
            <Link
              href={`/photo/${photo.id}`}
              key={photo.id}
              className={styles.photoCard}
            >
              <div
                className={styles.imageWrapper}
                style={{ backgroundColor: photo.color || '#e0e0e0' }}
              >
                <Image
                  src={photo.urls.small || photo.urls.regular}
                  alt={photo.alt_description || photo.description || 'Unsplash photo'}
                  width={photo.width || 800}
                  height={photo.height || 600}
                  sizes={
                    columns === 5
                      ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 25vw, 20vw'
                      : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className={styles.image}
                  loading="lazy"
                />

                <div className={styles.overlay}>
                  <div className={styles.overlayTop}>
                    <div className={styles.likeBadge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{photo.likes}</span>
                    </div>
                  </div>

                  <div className={styles.overlayBottom}>
                    <div className={styles.author}>
                      <Image
                        src={photo.user.profile_image.small || photo.user.profile_image.medium}
                        alt={photo.user.name}
                        width={32}
                        height={32}
                        className={styles.avatar}
                      />
                      <span className={styles.authorName}>{photo.user.name}</span>
                    </div>

                    <div className={styles.downloadIcon} title="Download photo" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
