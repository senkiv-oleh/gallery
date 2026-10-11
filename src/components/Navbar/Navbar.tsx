'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Navbar.module.scss';

const POPULAR_TAGS = [
  'Nature',
  'Architecture',
  'Travel',
  'Ocean',
  'Mountain',
  'City',
  'Night',
  'Wildlife',
  'Minimal',
  'Coffee',
];

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(currentQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.navMain}>
        <Link href="/" className={styles.logo} aria-label="Unsplash Home">
          <svg
            className={styles.logoIcon}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
          </svg>
          <div className={styles.logoText}>
            <span className={styles.brandTitle}>Unsplash</span>
            <span className={styles.brandSubtitle}>Photos for everyone</span>
          </div>
        </Link>

        <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
          <button type="submit" className={styles.searchButton} aria-label="Search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search high-resolution images..."
            className={styles.searchInput}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </form>

        <div className={styles.navActions}>
          <Link href="/" className={styles.exploreLink}>
            Explore
          </Link>
        </div>
      </div>

      <nav className={styles.topicsNav}>
        <ul className={styles.topicsList}>
          <li>
            <Link href="/" className={styles.topicItem}>
              Editorial
            </Link>
          </li>
          {POPULAR_TAGS.map((tag) => (
            <li key={tag}>
              <Link href={`/tag/${encodeURIComponent(tag.toLowerCase())}`} className={styles.topicItem}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
