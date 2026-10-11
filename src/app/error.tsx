'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: '64px 24px', fontFamily: 'inherit' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#111' }}>
        Something went wrong
      </h2>
      <p style={{ color: '#666', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Try again
      </button>
    </div>
  );
}
