export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  rooms: {
    scene_bin: '/rooms/scene.bin',
    scene_gltf: '/rooms/scene.gltf',
    textures: {
      Colors_baseColor_png: '/rooms/textures/Colors_baseColor.png',
      Colors_metallicRoughness_png: '/rooms/textures/Colors_metallicRoughness.png'
    }
  }
} as const

export type StaticPath = typeof staticPath
