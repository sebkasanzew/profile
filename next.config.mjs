/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	compiler: {
		reactRemoveProperties: true,
		removeConsole: true,
	},

	experimental: {
		appDir: true,
	},
}

export default nextConfig
