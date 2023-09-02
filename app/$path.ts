const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  assets: {
    rooms: {
      low_poly_isometric_rooms_glb: '/assets/rooms/low_poly_isometric_rooms.glb'
    }
  },
  favicon_ico: '/favicon.ico'
} as const;

export type StaticPath = typeof staticPath;
