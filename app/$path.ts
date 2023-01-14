export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  assets: {
    rooms: {
      low_poly_isometric_rooms_glb: '/assets/rooms/low_poly_isometric_rooms.glb'
    }
  },
  favicon_ico: '/favicon.ico'
} as const

export type StaticPath = typeof staticPath
