import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unsplash - Free High-Resolution Photos',
  description: 'Beautiful, free images and photos that you can download and use for any project.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div style={{ height: '60px', borderBottom: '1px solid #e1e1e1' }} />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
