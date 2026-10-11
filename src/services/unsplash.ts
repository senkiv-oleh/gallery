import { UnsplashImage, PaginatedPhotos, SearchPhotosResponse } from '@/types/unsplash';

const BASE_URL = 'https://api.unsplash.com';

function getHeaders(): HeadersInit {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('UNSPLASH_ACCESS_KEY is not defined');
  }
  return {
    Authorization: `Client-ID ${accessKey}`,
  };
}

export async function getPhotos(page: number = 1, perPage: number = 12): Promise<PaginatedPhotos> {
  const res = await fetch(`${BASE_URL}/photos?page=${page}&per_page=${perPage}`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch photos: ${res.status}`);
  }

  const data: UnsplashImage[] = await res.json();
  const total = Number(res.headers.get('x-total')) || 120;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return {
    photos: Array.isArray(data) ? data : [],
    total,
    totalPages,
    currentPage: page,
  };
}

export async function searchPhotos(query: string, page: number = 1, perPage: number = 12): Promise<PaginatedPhotos> {
  const res = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to search photos: ${res.status}`);
  }

  const data: SearchPhotosResponse = await res.json();

  return {
    photos: Array.isArray(data.results) ? data.results : [],
    total: data.total || 0,
    totalPages: data.total_pages || 1,
    currentPage: page,
  };
}

export async function getPhotosByTag(tag: string, page: number = 1, perPage: number = 12): Promise<PaginatedPhotos> {
  return searchPhotos(tag, page, perPage);
}

export async function getPhotoById(id: string): Promise<UnsplashImage | null> {
  const res = await fetch(`${BASE_URL}/photos/${id}`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch photo: ${res.status}`);
  }

  return res.json();
}
