export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  bio?: string | null;
  location?: string | null;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface UnsplashTag {
  title: string;
  type?: string;
}

export interface UnsplashImage {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  likes: number;
  views?: number;
  downloads?: number;
  user: UnsplashUser;
  tags?: UnsplashTag[];
  location?: {
    name?: string | null;
    city?: string | null;
    country?: string | null;
  };
  exif?: {
    make?: string | null;
    model?: string | null;
    exposure_time?: string | null;
    aperture?: string | null;
    focal_length?: string | null;
    iso?: number | null;
  };
}

export interface SearchPhotosResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface PaginatedPhotos {
  photos: UnsplashImage[];
  total: number;
  totalPages: number;
  currentPage: number;
}
